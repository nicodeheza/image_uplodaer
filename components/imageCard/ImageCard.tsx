import Image from "next/image";
import {Dispatch, useLayoutEffect, useState, SetStateAction} from "react";
import CheckIcon from "../icons/CheckIcon";
import styles from "./imageCard.module.css";

export interface ImageCardProps {
	imageName: string;
	setShowCopy: Dispatch<SetStateAction<boolean>>;
}

export default function ImageCard({imageName, setShowCopy}: ImageCardProps) {
	const [imageUrl, setImageUrl] = useState("");

	useLayoutEffect(() => {
		setImageUrl(
			`${window.location.protocol}//${window.location.host}/uploads/${imageName}`
		);
	}, [imageName]);

	async function copyLink(link: string) {
		try {
			await navigator.clipboard.writeText(link);
			setShowCopy(true);
		} catch (error) {
			alert("Error copying image url");
			console.log(error);
		}
	}
	return (
		<div className={styles.imageCard}>
			<div>
				<CheckIcon />
			</div>
			<h1>Uploaded Successfully!</h1>
			<Image
				width={338}
				height={224.4}
				src={`/uploads/${imageName}`}
				alt="loaded Image"
				objectFit="contain"
				priority
			/>
			<div className={styles.linkContainer}>
				<div className={styles.urlContainer}>
					<p>{imageUrl}</p>
				</div>
				<button onClick={() => copyLink(imageUrl)}>Copy Link</button>
			</div>
		</div>
	);
}
