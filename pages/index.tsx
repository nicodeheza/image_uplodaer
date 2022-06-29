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
			className="d-flex justify-content-center align-items-center"
			style={{height: "100vh"}}
		>
			<Uploader setFile={setFile} />
		</div>
	);
};

export default Home;
