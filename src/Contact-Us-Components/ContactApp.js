import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ContactApp.css";
import Faq from "../Home-Components/Faq/Faq";
import ContactForm from "./ContactForm";
import ContactHero from "./ContactHero";
import PopUpAlert from "./popUpAlert";
import Animation from "../Animation-Component/Animation";
import axios from "axios";
import { GRAPHQL_API } from "../Api/Client";
import { Helmet } from "react-helmet";

function App() {
	Animation();
	let url = useLocation();
	useEffect(() => {
		// console.log("Location Change", url.pathname);
	}, [url]);

	const SEO_QUERY = `
	{
		page(id: "${url.pathname}", idType: URI) {
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
		  title
		  uri
		  content
		}
	  }
	`;

	const [seoData, setSeoData] = useState();
	useEffect(() => {
		async function fetchMyAPI() {
			await axios
				.post(GRAPHQL_API, { query: SEO_QUERY })
				.then((res) => {
					setSeoData(res.data.data.page);
				})
				.catch((error) => {
					console.log("Error", error);
				});
		}
		fetchMyAPI();
	},[]);

	const [PopUp, setPopUp] = React.useState(true);
	// console.log("pop", PopUp);
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
			<div className="contact-page-wrapper">
				{PopUp === true ? (
					<>
						<ContactHero />
						<ContactForm setPop={setPopUp} />
						<Faq />
					</>
				) : (
					<>
						<ContactHero />
						<PopUpAlert />
						<Faq />
					</>
				)}
			</div>
		</>
	);
}

export default App;
