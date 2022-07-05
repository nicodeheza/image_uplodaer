import type {NextPage} from "next";
import {useEffect, useRef, useState} from "react";
import Uploader from "../components/uploader/Uploader";
import Loader from "../components/loader/Loader";
import ImageCard from "../components/imageCard/ImageCard";
import styles from "../styles/index.module.css";
import Head from "next/head";

const Home: NextPage = () => {
	const [file, setFile] = useState<Blob>();
	const [imageName, setImageName] = useState<string>();
	const [showCopy, setShowCopy] = useState(false);

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
		<>
			<Head>
				<title>Image Uploader</title>
			</Head>

			<div className={styles.indexContainer}>
				{!file && !imageName ? (
					<Uploader setFile={setFile} />
				) : file && !imageName ? (
					<Loader />
				) : file && imageName ? (
					<ImageCard imageName={imageName} setShowCopy={setShowCopy} />
				) : null}
				{showCopy && (
					<p className={styles.copy} onAnimationEnd={() => setShowCopy(false)}>
						Link Copied
					</p>
				)}
				<footer>
					created by{" "}
					<a href="https://github.com/nicodeheza" target="_blank" rel="noreferrer">
						nicodeheza
					</a>{" "}
					- devChallenges.io
				</footer>
			</div>
		</>
	);
};

export default Home;
