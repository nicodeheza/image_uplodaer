import ImageCard from "./ImageCard";
import {fireEvent, render} from "@testing-library/react";
import renderer from "react-test-renderer";
import {act} from "react-dom/test-utils";

Object.assign(navigator, {
	clipboard: {
		writeText: () => {}
	}
});

const imageName = "Chuck-Norris.jpg";
const imageUrlRegExp = /^(http|https):\/\/[\w\W]+\/api\/Chuck-Norris.jpg$/;

describe("ImageCard component", () => {
	let imageUrl: string;
	it("image must be rendered successfully", () => {
		const setShowCopy = jest.fn();
		const {getByAltText} = render(
			<ImageCard imageName={imageName} setShowCopy={setShowCopy} />
		);
		const image = getByAltText("loaded Image");
		const src = image.getAttribute("src");

		const isImage = /(?=.*Chuck-Norris\.jpg)(?=.*api).*/.test(src!);
		expect(isImage).toBeTruthy();
	});
	it("image url must be displayed", () => {
		const setShowCopy = jest.fn();
		const {getByText} = render(
			<ImageCard imageName={imageName} setShowCopy={setShowCopy} />
		);
		const url = getByText(imageUrlRegExp);
		imageUrl = url.textContent!;

		expect(url).toBeTruthy();
	});
	it("when copy button is clicked the url must be copied to the clipboard and setShowCopy called with true", async () => {
		const setShowCopy = jest.fn();
		const {getByText} = render(
			<ImageCard imageName={imageName} setShowCopy={setShowCopy} />
		);
		const button = getByText("Copy Link");
		const promise = Promise.resolve();

		const clipboardSpy = jest.spyOn(navigator.clipboard, "writeText");
		clipboardSpy.mockImplementationOnce(() => promise);

		expect(button).toBeTruthy();
		fireEvent.click(button);

		await act(async () => {
			await promise;
		});

		expect(navigator.clipboard.writeText).toHaveBeenCalledWith(imageUrl);
		expect(setShowCopy).toHaveBeenCalledWith(true);
		clipboardSpy.mockReset();
		clipboardSpy.mockRestore();
	});
	it("snapshot", () => {
		const setShowCopy = jest.fn();
		const tree = renderer
			.create(<ImageCard imageName={imageName} setShowCopy={setShowCopy} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
