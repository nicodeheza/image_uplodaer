import {NextApiRequest, NextApiResponse} from "next";
import {readFileSync} from "fs";
import handler from "../../pages/api/[imageName]";
import {join} from "path";

const imagePath = join(__dirname, "../../uploads/Chuck-Norris.jpg");

describe("/api/imageName", () => {
	it("must send the image requested", async () => {
		const req = {} as NextApiRequest;
		req.query = {imageName: "Chuck-Norris.jpg"};
		req.method = "GET";
		const res = {} as NextApiResponse;
		res.send = jest.fn();
		handler(req, res);
		expect(res.send).toHaveBeenCalledWith(readFileSync(imagePath));
	});
	it("handle non-existing image", async () => {
		const req = {} as NextApiRequest;
		req.query = {imageName: "bad.jpg"};
		req.method = "GET";
		const res = {} as NextApiResponse;
		res.send = jest.fn(() => res);
		res.status = jest.fn(() => res);
		handler(req, res);
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.send).toHaveBeenCalledWith("image not exists");
	});
});
