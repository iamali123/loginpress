import "./DocSingle.css";
import Faq from "../Home-Components/Faq/Faq";
import DocHero from "../Documentation-Components/Dochero";
import DocSingleContent from "../Doc-Single-Components/DocSingleContent";
import { useParams } from "react-router-dom";
import Animation from "../Animation-Component/Animation";
import Sidebar from "./Sidebar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { GRAPHQL_API } from "../Api/Client";
import { Helmet } from "react-helmet";

function App() {
	Animation();

	let { docId } = useParams();
	useEffect(() => {
		  console.log("doc", docId);
	}, [docId]);


	const SEO_QUERY = `
	{
		doc(id: "${docId}", idType: SLUG) {
			seo {
			  title
			  canonical
			  focuskw
			  metaDesc
			  metaKeywords
			  metaRobotsNofollow
			  metaRobotsNoindex
			  opengraphDescription
			  opengraphPublisher
			  opengraphSiteName
			  opengraphTitle
			  opengraphType
			  opengraphUrl
			  twitterDescription
			  twitterTitle
			  breadcrumbs {
				text
				url
			  }
			  cornerstone
			  opengraphAuthor
			  opengraphImage {
				title
				sourceUrl
				caption
			  }
			  twitterImage {
				sourceUrl
				title
				caption
				description
				sizes
			  }
			}
			docsCategory {
			  nodes {
				slug
			  }
			}
			content
			title
			slug
			modified
		  }
	  }
	`;

	const [seoData, setSeoData] = useState();
	useEffect(() => {
		async function fetchMyAPI() {
			await axios
				.post(GRAPHQL_API, { query: SEO_QUERY })
				.then((res) => {
					setSeoData(res.data.data.doc.seo);
				})
				.catch((error) => {
					console.log("Error", error);
				});
		}
		fetchMyAPI();
	},[]);


	return (
		<>
					{seoData !== undefined ? (
				<Helmet>
					<title>{seoData.title}</title>
					<meta name="description" content={seoData.metaDesc} />
					<meta name="keywords" content={seoData.metaKeywords} />
					<meta
						property="og:description"
						content={seoData.opengraphDescription}
					/>
					<meta property="og:image" content={seoData.opengraphImage} />
					<meta property="og:title" content={seoData.opengraphTitle} />
					<meta property="og:type" content={seoData.opengraphType} />
					<meta property="og:url" content={seoData.opengraphUrl} />
					<meta
						property="og:description"
						content={seoData.twitterDescription}
					/>
					<meta property="og:image" content={seoData.twitterImage} />
					<meta property="og:title" content={seoData.twitterTitle} />
				</Helmet>
			) : (
				""
			)}
			<DocHero />
			<div className="doc-single-wrapper">
				<div className="inner-wrap">
					<DocSingleContent docLink={docId} />
					<Sidebar docLink={docId} />
				</div>
			</div>
			<Faq />
		</>
	);
}

export default App;
