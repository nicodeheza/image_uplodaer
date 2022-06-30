import type {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import {useState} from "react";
import Uploader from "../components/uploader/Uploader";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	const [file, setFile] = useState();
	return (
		<div
			style={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<Uploader setFile={setFile} />
		</div>
	);
};

export default Home;
