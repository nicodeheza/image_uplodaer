import styles from "./loader.module.css";

export default function Loader() {
	return (
		<div className={styles.loaderMainContainer}>
			<h1>Uploading...</h1>
			<div className={styles.progressBar}>
				<div className={styles.progressBarProgress} />
			</div>
		</div>
	);
}
