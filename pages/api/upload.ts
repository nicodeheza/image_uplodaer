import {NextApiRequest, NextApiResponse} from "next";
import nc from "next-connect";
import multer from "multer";
import {v4 as uuid} from "uuid";

interface reqT extends NextApiRequest {
	file: Express.Multer.File;
}

const upload = multer({
	storage: multer.diskStorage({
		destination: "./public/uploads",
		filename: (req, file, cb) => {
			let format: string[] | string = file.originalname.split(".");
			format = format[format.length - 1];
			cb(null, `photo-${uuid()}.${format}`);
		}
	}),
	fileFilter: (req, file, cb) => {
		const isImage = /^image\/+[\w\W]+/.test(file.mimetype);
		cb(null, isImage);
	}
});

const handler = nc<NextApiRequest, NextApiResponse>({
	onError: (err, req, res, next) => {
		console.log(err.stack);
		res.status(500).end("Something broke!");
	},
	onNoMatch: (req, res) => {
		res.status(404).end("Page is not found");
	}
});

handler.use(upload.single("image")).post((req: reqT, res) => {
	console.log(req.body);
	if (req.file !== undefined) {
		res.status(200).json({fileName: req.file.filename});
	} else {
		res.status(415).json({error: "format not allowed"});
	}
});

export default handler;
export const config = {
	api: {
		bodyParser: false
	}
};
