import ImageCard from "./ImageCard";
import {fireEvent, render} from "@testing-library/react";
import renderer from "react-test-renderer";

Object.assign(navigator, {
	clipboard: {
		writeText: () => {}
	}
});

const imageName = "Chuck-Norris.jpg";
const imageUrlRegExp = /^(http|https):\/\/[\w\W]+\/uploads\/Chuck-Norris.jpg$/;

describe("ImageCard component", () => {
	let imageUrl: string;
	it("image must be rendered successfully", () => {
		const {getByAltText} = render(<ImageCard imageName={imageName} />);
		const image = getByAltText("loaded Image");
		const src = image.getAttribute("src");

		const isImage = /(?=.*Chuck-Norris\.jpg)(?=.*uploads).*/.test(src!);
		expect(isImage).toBeTruthy();
	});
	it("image url must be displayed", () => {
		const {getByText} = render(<ImageCard imageName={imageName} />);
		const url = getByText(imageUrlRegExp);
		imageUrl = url.textContent!;

		expect(url).toBeTruthy();
	});
	it("when copy button is clicked the url must be copied to the clipboard", () => {
		const {getByText} = render(<ImageCard imageName={imageName} />);
		const button = getByText("Copy Link");
		const spy = jest.spyOn(navigator.clipboard, "writeText");

		expect(button).toBeTruthy();
		fireEvent.click(button);

		expect(spy).toHaveBeenCalledWith(imageUrl);
	});
	it("snapshot", () => {
		const tree = renderer.create(<ImageCard imageName={imageName} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
