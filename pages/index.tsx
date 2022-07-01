import type {NextPage} from "next";
import {useEffect, useState} from "react";
import Uploader from "../components/uploader/Uploader";
import Loader from "../components/loader/Loader";

const Home: NextPage = () => {
	const [file, setFile] = useState();
	useEffect(() => {
		console.log(file);
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
			{/* <Uploader setFile={setFile} /> */}
			<Loader />
		</div>
	);
};

export default Home;
