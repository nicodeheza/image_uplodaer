import {NextApiRequest, NextApiResponse} from "next";
import {readFileSync, existsSync} from "fs";
import {join, resolve} from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const {imageName} = req.query;
	const filePath = resolve("uploads", `${imageName}`);
	if (existsSync(filePath)) {
		res.send(readFileSync(filePath));
	} else {
		res.status(404).send("image not exists");
	}
}
