import Uploader, {UploaderProps} from "./Uploader";
import {fireEvent, render} from "@testing-library/react";
import renderer from "react-test-renderer";

describe("Uploader component", () => {
	it("update setFile when image is drag and drop to the D&D container", () => {
		const setFile = jest.fn();
		const files = [new File(["(⌐□_□)"], "chucknorris.png", {type: "image/png"})];
		const {getByTestId, getByTitle} = render(<Uploader setFile={setFile} />);
		fireEvent.dragEnter(getByTitle("Image form"));
		fireEvent.drop(getByTestId("D&D"), {
			dataTransfer: {
				files
			}
		});
		expect(setFile.mock.calls.length).toBe(1);
		expect(setFile.mock.calls[0]).toEqual(files);
	});
	it("when button is clicked  select an image from a folder", () => {
		const setFile = jest.fn();
		const files = [new File(["(⌐□_□)"], "chucknorris.png", {type: "image/png"})];
		const {getByText, getByTitle} = render(<Uploader setFile={setFile} />);
		const input = getByTitle("file input");
		const inputOnClickSpy = jest.spyOn(input, "click");

		fireEvent.click(getByText("Choose a file"));

		expect(inputOnClickSpy).toBeCalled();

		fireEvent.change(input, {
			target: {
				files
			}
		});

		expect(setFile.mock.calls.length).toBe(1);
		expect(setFile.mock.calls[0]).toEqual(files);
	});
	it("if trying to upload non-image file, alert user", () => {
		const setFile = jest.fn();
		const files = [new File(["(⌐□_□)"], "chucknorris.html", {type: "text/html"})];
		const {getByText, getByTitle} = render(<Uploader setFile={setFile} />);
		const input = getByTitle("file input");
		const saveAlert = window.alert;
		window.alert = jest.fn();

		fireEvent.change(input, {
			target: {
				files
			}
		});

		expect(setFile.mock.calls.length).toBe(0);
		expect(window.alert).toHaveBeenCalled();
		window.alert = saveAlert;
	});
	it("snapshot", () => {
		const setFile = jest.fn();
		const tree = renderer.create(<Uploader setFile={setFile} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
