import Image from "next/image";
import {useRef, useState, Dispatch, SetStateAction} from "react";
import styles from "./Uploader.module.css";

export interface UploaderProps {
	setFile: Dispatch<SetStateAction<undefined>>;
}

export default function Uploader({setFile}: UploaderProps) {
	const [dragActive, setDragActive] = useState(false);

	const inputRef = useRef<null | HTMLInputElement>(null);

	function isImage(fileType: string) {
		const regEx = /^image\/+[\w\W]+/;
		const is = regEx.test(fileType);
		if (!is) alert("Only image files are accepted");
		return is;
	}

	const handleDrag = function (e: any) {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = function (e: any) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			const fileType = e.dataTransfer.files[0].type;
			if (isImage(fileType)) {
				setFile(e.dataTransfer.files[0]);
			}
		}
	};

	const handleChange = function (e: any) {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			const fileType = e.target.files[0].type;
			if (isImage(fileType)) {
				setFile(e.target.files[0]);
			}
		}
	};
	const onButtonClick = () => {
		inputRef.current?.click();
	};

	return (
		<form
			id="form-file-upload"
			onDragEnter={handleDrag}
			onSubmit={(e) => e.preventDefault()}
			title="Image form"
			className={styles.formCard}
		>
			<h1>Upload your image</h1>
			<p className={styles.primaryText}>File should be Jpeg, Png,...</p>
			<input
				ref={inputRef}
				type="file"
				id="input-file-upload"
				multiple={true}
				onChange={handleChange}
				title="file input"
				accept="image/*"
			/>
			<label id="label-file-upload" htmlFor="input-file-upload">
				<div
					className={styles.dropView}
					style={dragActive ? {border: "solid 1px red"} : {}}
				>
					<Image width={114.13} height={88.24} src="/image.svg" alt="image" priority />
					<p className={styles.secondaryText}>Drag & Drop your image here</p>
				</div>
			</label>
			<p className={styles.secondaryText + " " + styles.or}>Or</p>
			<button onClick={onButtonClick}>Choose a file</button>
			{dragActive && (
				<div
					id="drag-file-element"
					data-testid="D&D"
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
					className={styles.drop}
				></div>
			)}
		</form>
	);
}
