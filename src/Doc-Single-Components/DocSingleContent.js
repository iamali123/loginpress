import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GRAPHQL_API } from "../Api/Client";
import Loader from "../Loader-Components/Loader";


const DocSingleContent = ({ docLink }) => {
	const QUERY_9 = `{ 
		docs(where: {name: "${docLink}"}) {
			edges {
			  node {
				title
				content
				modified
				docsCategory {
				  edges {
					node {
					  slug
					}
				  }
				}
			  }
			}
		  }}`;

	const [DocSingleData, setDocSingleData] = useState();
	useEffect(() => {
		async function fetchMyAPI() {
	await	axios
			.post(GRAPHQL_API, { query: QUERY_9 })
			.then((res) => {
				setDocSingleData(res.data.data.docs.edges);
			})
			.catch((error) => {
				console.log("Error", error);
			});
		}
		fetchMyAPI()
	},[]);

	return (
		<div className="lp-single-content">
			{DocSingleData !== undefined
				? DocSingleData.map((item, index) => {
					let date = item.node.modified;

const formateDate = ( rawDate ) => {
	const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
	let _date = new Date(rawDate);
  return monthNames[_date.getMonth()] + ' ' + _date.getDay() + ', ' + _date.getFullYear();
}
				
						return (
							<>
								<div className="lg-content-holder">
									<h3>{item.node.title}</h3>
									<div
										dangerouslySetInnerHTML={{ __html: item.node.content }}
									></div>
								</div>
								<div className="lp-help-bar">
									<p>
										Still stuck? <Link to="/contact/">How can we help?</Link>
									</p>
									<p className="last-update">Updated on {formateDate(date)}</p>
								</div>
							</>
						);
				  })
				: <Loader /> }
		</div>
	);
};

export default DocSingleContent;
