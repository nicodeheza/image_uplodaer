import Image from "next/image";
import {useRef, useState, Dispatch, SetStateAction} from "react";
import styles from "./Uploader.module.css";

export interface UploaderProps {
	setFile: Dispatch<SetStateAction<undefined>>;
}

export default function Uploader({setFile}: UploaderProps) {
	const [dragActive, setDragActive] = useState(false);

	const inputRef = useRef<null | HTMLInputElement>(null);

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
			// handleFiles(e.dataTransfer.files);
			setFile(e.dataTransfer.files[0]);
		}
	};

	const handleChange = function (e: any) {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
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
			<p>File should be Jpeg, Png,...</p>
			<input
				ref={inputRef}
				type="file"
				id="input-file-upload"
				multiple={true}
				onChange={handleChange}
				title="file input"
			/>
			<label id="label-file-upload" htmlFor="input-file-upload">
				<div>
					<Image width={114.13} height={88.24} src="/image.svg" alt="image" />
					<p>Drag & Drop your image here</p>
				</div>
			</label>
			<p>Or</p>
			<button onClick={onButtonClick}>Choose a file</button>
			{dragActive && (
				<div
					id="drag-file-element"
					data-testid="D&D"
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}
				></div>
			)}
		</form>
	);
}
