import Uploader from "./Uploader";
import {render} from "@testing-library/react";

describe("Uploader component", () => {
	it("container must have a max-with of 402px and a max-height fo 469px", () => {
		const {getByTestId} = render(<Uploader />);
		const container = getByTestId("Uploader_container");
		expect(container).toBeTruthy();
		expect(container).toHaveStyle("maxWidth: 402px");
		expect(container).toHaveStyle("max-height: 469px");
	});
	it("'Upload your image' title must be rendered centered", () => {});
	it("'File should be Jpeg, Png,...' subtitle must be rendered", () => {});
	it("drag and drop box must be render with dot border, svg image and subtitle", () => {});
	it("drag and drop an image to submit it", () => {});
	it("or must be render", () => {});
	it("choose a file button must be render correctly ", () => {});
	it("when button is clicked  select an image from a folder", () => {});
	it("when an image is selected it must be uploaded", () => {});
});
