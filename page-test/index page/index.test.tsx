import Index from "../../pages/index";
import {fireEvent, render, waitFor} from "@testing-library/react";
import {act} from "react-dom/test-utils";

Object.assign(navigator, {
	clipboard: {
		writeText: () => {}
	}
});

describe("Index Component", () => {
	it("first Uploader must be rendered", () => {
		const {getByText} = render(<Index />);
		expect(getByText("Upload your image")).toBeTruthy();
	});
	it("if file is selected file must be sent to the server and loader must be rendered", async () => {
		const promise = Promise.resolve({
			json: () => Promise.resolve({fileName: "photo-11111.jpg"})
		});
		global.fetch = jest.fn(() => promise) as jest.Mock;
		const files = [new File(["(⌐□_□)"], "chucknorris.png", {type: "image/png"})];
		const {getByText, getByTitle} = render(<Index />);
		const input = getByTitle("file input");

		expect(input).toBeTruthy();

		fireEvent.change(input, {
			target: {
				files
			}
		});

		expect(getByText("Uploading...")).toBeTruthy();

		await act(async () => {
			await promise;
		});

		expect((global.fetch as jest.Mock).mock.calls[0][0]).toBe("/api/upload");

		const fetchConfig = (global.fetch as jest.Mock).mock.calls[0][1];
		expect(fetchConfig!.method).toBe("POST");
		expect(fetchConfig!.body).toBeTruthy();
	});
	it("if the save file name is response imageCard must be rendered", async () => {
		const promise = Promise.resolve({
			json: () => Promise.resolve({fileName: "photo-11111.jpg"})
		});
		global.fetch = jest.fn(() => promise) as jest.Mock;

		const files = [new File(["(⌐□_□)"], "chucknorris.png", {type: "image/png"})];
		const {findByText, getByTitle} = render(<Index />);
		const input = getByTitle("file input");

		fireEvent.change(input, {
			target: {
				files
			}
		});

		const imageCard = await findByText("Uploaded Successfully!");

		expect(imageCard).toBeTruthy();
	});
	it("if imageCard button is clicked render copied message", async () => {
		const promise = Promise.resolve({
			json: () => Promise.resolve({fileName: "photo-11111.jpg"})
		});
		global.fetch = jest.fn(() => promise) as jest.Mock;

		const clipboardSpy = jest.spyOn(navigator.clipboard, "writeText");
		const clipPromise = Promise.resolve();
		clipboardSpy.mockImplementation(() => clipPromise);

		const files = [new File(["(⌐□_□)"], "chucknorris.png", {type: "image/png"})];
		const {findByText, getByTitle} = render(<Index />);
		const input = getByTitle("file input");

		fireEvent.change(input, {
			target: {
				files
			}
		});

		const copyBtn = await findByText("Copy Link");
		window.alert = jest.fn();
		expect(copyBtn).toBeTruthy();
		fireEvent.click(copyBtn);
		expect(window.alert).toBeCalledTimes(0);

		await act(async () => {
			await clipPromise;
		});

		const copyMessage = await findByText("Link Copied");

		expect(copyMessage).toBeTruthy();
		clipboardSpy.mockReset();
		clipboardSpy.mockRestore();
	});
	it("alert if an error is reponsed and go back to Uploader", async () => {
		window.alert = jest.fn();
		const promise = Promise.resolve({
			json: () => Promise.resolve({error: "format not allowed"})
		});
		global.fetch = jest.fn(() => promise) as jest.Mock;
		const files = [new File(["(⌐□_□)"], "chucknorris.png", {type: "image/png"})];
		const {findByText, getByTitle} = render(<Index />);
		const input = getByTitle("file input");

		fireEvent.change(input, {
			target: {
				files
			}
		});

		await act(async () => {
			await promise;
		});

		const uploader = await findByText("Upload your image");
		expect(uploader).toBeTruthy();

		expect(window.alert).toHaveBeenCalledWith("An error occurred");
	});
});
