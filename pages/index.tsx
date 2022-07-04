import type {NextPage} from "next";
import {useEffect, useRef, useState} from "react";
import Uploader from "../components/uploader/Uploader";
import Loader from "../components/loader/Loader";
import ImageCard from "../components/imageCard/ImageCard";

const Home: NextPage = () => {
	const [file, setFile] = useState<Blob>();
	const [imageName, setImageName] = useState<string>();

	useEffect(() => {
		if (file) {
			const formData = new FormData();
			formData.append("image", file);
			fetch("/api/upload", {
				method: "POST",
				body: formData
			})
				.then((res) => res.json())
				.then((data) => {
					if (!data.fileName) throw data.error;
					setImageName(data.fileName);
				})
				.catch((err) => {
					console.log(err);
					setFile(undefined);
					setImageName(undefined);
					alert("An error occurred");
				});
		}
	}, [file]);
	return (
		<div
			style={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			{!file && !imageName ? (
				<Uploader setFile={setFile} />
			) : file && !imageName ? (
				<Loader />
			) : file && imageName ? (
				<ImageCard imageName={imageName} />
			) : null}
		</div>
	);
};

export default Home;
