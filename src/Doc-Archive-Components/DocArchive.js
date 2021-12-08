import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const DocArchive = (archiveId) => {
	const [DocData, setDocData] = useState();
	var apiDocData = useSelector((record) => record.apiReducer);

	useEffect(() => {
		async function fetchMyAPI() {
			if (apiDocData.length !== 0) {
				setDocData(apiDocData.docsCategory.edges);
			}
		}
		fetchMyAPI();
	}, [apiDocData]);

	return (

				<div className="lp-single-content">
					<div className="lg-content-holder">
						<ul className="lp-doc-list">
							{DocData !== undefined
								? DocData.map((item, index) => {
									var getLink = item.node.uri;
					
										return (
											<>
												{item.node.docs.nodes.map((item, index) => {
													if(getLink === `/docs-category/${archiveId.archiveLink}/`){
													
													return (
														<li key={index}>
															<Link to={item.uri}>
																{item.title}
															</Link>
														</li>
													);
													}
												})}
											</>
										);
								  })
								: ""}
						</ul>
					</div>
				</div>

	);
};

export default DocArchive;
