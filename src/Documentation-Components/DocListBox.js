import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Loader-Components/Loader";

const Doc = () => {
	const [DocData, setDocData] = useState();
	var apiDocData = useSelector((record) => record.apiReducer);

	useEffect(() => {
		async function fetchMyAPI() {
			if (apiDocData.length !== 0) {
				setDocData(apiDocData.docsCategory.edges);
			}
		}
		fetchMyAPI()
	}, [apiDocData]);

	return (
		<div className="doc-wraper">
			<div className="inner-wrap">
				{
					DocData !== undefined ? (
			 	DocData.map((item, index) => {
		
						return (
							<div className="col-3" key={index}>
								<div className="doc-box">
									<h5>{item.node.name}</h5>
									<div className="doc-inner">
										<ul>
											{item.node.docs.nodes.slice(0, 5).map((subItem, subIndex) => {
												return (
													<li key={subIndex}>
														<Link to={subItem.uri}>
															{subItem.title}
														</Link>
													</li>
												);
											})}
										</ul>
									</div>
									<div className="browse-all-wrapper">
										<Link to={item.node.uri} className="browe-all">
											Browse all Articles
										</Link>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

export default Doc;
