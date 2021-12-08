import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { useSelector } from "react-redux";

const Dochero = () => {
	// const [DocSearchData, setDocSearchData] = useState();
	// const [DocSearchSlug, setDocSearchSlug] = useState();
	// var apiDocSearchData = useSelector((record) => record.apiReducer);
	 const history = useHistory();
	// useEffect( () => {
	// 	async function fetchMyAPI() {
	// 	if (apiDocSearchData.length !== 0) {
	// 		const { DocSearchSlug } = apiDocSearchData.docs.nodes;
	// 		setDocSearchSlug(DocSearchSlug);
	// 		setDocSearchData(apiDocSearchData.docs.nodes);
	// 	}
	// }
	// fetchMyAPI()
	// }, [apiDocSearchData]);

	const [name, setName] = useState("");
	const searchHandler = () => {
		history.push(`/search?word=${name}`);
	};
	return (
		<div className="hero-search">
			<div className="wrap">
				<div className="faq-before fade-me">
					<img
						src={require("../assets/images/faq-before.svg").default}
						alt="dummy"
					/>
				</div>
				<h1>Documentation</h1>
				<div className="lp_description">
					<p>
						Would you like to write for us or do you have suggestions about how
						to improve our website? We'd love to hear from you!
					</p>
				</div>
				<form action="" className="search-form" onSubmit={searchHandler} >
					<input type="text" name="s" placeholder="Search the knowledge base" value={name} onChange={(e) => setName(e.target.value)} />
					<input type="submit" value="Search" />
				</form>
				<div className="faq-after fade-me">
					<img
						src={require("../assets/images/faq-after.svg").default}
						alt="dummy"
					/>
				</div>
			</div>
		</div>
	);
};

export default Dochero;
