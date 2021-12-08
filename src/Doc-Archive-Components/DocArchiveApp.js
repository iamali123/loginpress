
import Faq from "../Home-Components/Faq/Faq";
import DocArchive from "./DocArchive";
import DocHero from "../Documentation-Components/Dochero";
import Animation from "../Animation-Component/Animation";
import { useParams } from "react-router-dom";
import Sidebar from "../Doc-Single-Components/Sidebar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { GRAPHQL_API } from "../Api/Client";
import { Helmet } from "react-helmet";

const DocArchiveApp = () => {
	Animation();
	let { archiveId } = useParams();

	useEffect(() => {
		// console.log("archiveId", archiveId)
	}, [archiveId])


	const SEO_QUERY = `
	{
		docCategory(id: "${archiveId}", idType: SLUG) {
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
			name
			slug
			description
			docs {
			  nodes {
				slug
				title
				uri
			  }
			}
		  }
	  }
	`;

	const [seoData, setSeoData] = useState();
	useEffect(() => {
		async function fetchMyAPI() {
			await axios
				.post(GRAPHQL_API, { query: SEO_QUERY })
				.then((res) => {
					setSeoData(res.data.data.docCategory.seo);
				})
				.catch((error) => {
					console.log("Error", error);
				});
		}
		fetchMyAPI();
	},[] );

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
			<DocArchive archiveLink={archiveId} />
			<Sidebar archiveLink={archiveId} />
			</div>
		</div>
			<Faq />
	</>
	);
};

export default DocArchiveApp;
