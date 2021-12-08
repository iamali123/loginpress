import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Sidebar from "../Doc-Single-Components/Sidebar";
import axios from "axios";
import { GRAPHQL_API} from "../Api/Client";
import Loader from '../Loader-Components/Loader';

const SearchContent = ({ word }) => {

	const SEARCH_QUERY = `
	{
		docs(where: {search: "${word}"}, first: 999) {
			nodes {
			  title
			  slug
			  excerpt
			}
		  }
	  }
	`;
	
	const [DocSearchData, setDocSearchData] = useState();
	useEffect(() => {
		async function fetchMyAPI() {
	await	axios
			.post(GRAPHQL_API, { query: SEARCH_QUERY })
			.then((res) => {
				setDocSearchData(res.data.data.docs.nodes);
			})
			.catch((error) => {
				console.log("Error", error);
			});
		}
		fetchMyAPI()
	},[DocSearchData] );

	
	// const [searchData, setSearchData] = useState([])
	// // const [searchData1, setSearchData1] = useState([])
	// useEffect(() => {
	// 	 setSearchData([])
	
	// 	for (let i = 0; i < DocSearchData.length; i++) {
	// 		if (DocSearchData[i].title.toLowerCase().includes(word.toLowerCase()) || DocSearchData[i].excerpt.toLowerCase().includes(word.toLowerCase())) {
	// 			setSearchData(pre => [...pre, DocSearchData[i]])
	// 			console.log("filter-data", pre => [...pre, DocSearchData[i]])
	// 		}
	// 	}
	// }, [word])

	return (
		<div className="doc-single-wrapper">
			<div className="inner-wrap">
				<div className="lp-single-content">
					<div className="lg-content-holder">
						<div className="lg-doc">

							{ DocSearchData !== undefined ? 
							DocSearchData.map((data, index) => {
								return (
									<div key={index}>
										<h3 className="h5">
											<Link to={data !== undefined ? data.slug : <h2>No record found</h2>}>{data !== undefined ? data.title : <h2>No record found</h2>}</Link>
										</h3>
										<div
											className="lg-doc-content"
											dangerouslySetInnerHTML={{ __html: data !== undefined ? data.excerpt : <h2>No record found</h2>}}
										></div>
									</div>
								);
							})
								:
								<Loader />
							}
						</div>
					</div>
				</div>
				<Sidebar />
			</div>
		</div>
	);
};

export default SearchContent;
