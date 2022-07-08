import endpoint from "../../pages/api/upload";
import type {PageConfig} from "next";
import fs from "fs";
import path from "path";
import {testApiHandler} from "next-test-api-route-handler";
import FormData from "form-data";

jest.mock("uuid", () => ({v4: () => "11111"}));

const handler: typeof endpoint & {config?: PageConfig} = endpoint;
handler.config = {
	api: {
		bodyParser: false
	}
};

const imagePath = path.join(__dirname, "testImage.jpg");
const savePath = path.join(__dirname, "../../uploads/photo-11111.jpg");
const nonImageFilePath = path.join(__dirname, "../../package.json");

describe("upload route", () => {
	it("send image fiel and uploaded successfully", async () => {
		const formData = new FormData();
		formData.append("image", fs.createReadStream(imagePath));

		await testApiHandler({
			handler,
			test: async ({fetch}) => {
				const res = await fetch({
					method: "POST",
					body: formData,
					headers: formData.getHeaders()
				});
				const data = await res.json();
				expect(data).toStrictEqual({
					fileName: "photo-11111.jpg"
				});
				expect(fs.existsSync(savePath)).toBeTruthy();
				fs.unlinkSync(savePath);
			}
		});
	});
	it("send a non-image file should not be uploaded", async () => {
		const formData = new FormData();
		formData.append("image", fs.createReadStream(nonImageFilePath));

		await testApiHandler({
			handler,
			test: async ({fetch}) => {
				const res = await fetch({
					method: "POST",
					body: formData,
					headers: formData.getHeaders()
				});
				const data = await res.json();
				expect(data).toStrictEqual({
					error: "format not allowed"
				});
				expect(!fs.existsSync(savePath)).toBeTruthy();
			}
		});
	});
});
