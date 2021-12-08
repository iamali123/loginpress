import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Animation from "../Animation-Component/Animation";
import './Terms.css'
import axios from "axios";
import { GRAPHQL_API} from "../Api/Client";
import { Helmet } from "react-helmet";

const TOS = () => {
	Animation();
	let url = useLocation();

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
	await	axios
			.post(GRAPHQL_API, { query: SEO_QUERY })
			.then((res) => {
				setSeoData(res.data.data.page);
				console.log(res.data.data.page)
			})
			.catch((error) => {
				console.log("Error", error);
			});
		}
		fetchMyAPI()
	},[] );

	return (
		<> 
				  { 	seoData !== undefined ? ( 
			<Helmet>
		  <title>{seoData.title}</title>
		  <meta name="description" content={seoData.metaDesc} />
		  <meta  name="keywords" content={seoData.metaKeywords} />
		  <meta  property="og:description" content={seoData.opengraphDescription} />
		  <meta  property="og:image" content={seoData.opengraphImage} />
		  <meta  property="og:title" content={seoData.opengraphTitle} />
		  <meta  property="og:type" content={seoData.opengraphType} />
		  <meta  property="og:url" content={seoData.opengraphUrl} />
		  <meta  property="og:description" content={seoData.twitterDescription} />
		  <meta  property="og:image"  content={seoData.twitterImage} />
		  <meta  property="og:title" content={seoData.twitterTitle} />
		  </Helmet>   
		  )  : ""
		  }   
		<section className="terms-of-services">
			<div className="inner-wrap">
				<div className="pircing-info">
					<div className="pricing-before fade-me ">
						<img
							src={require("../assets/images/rectangle-03.svg").default}
							alt="dummy"
						/>
					</div>
					<div className="pricing-head">
						<h1>{seoData !== undefined ? seoData.title : ""}</h1>
					</div>
					<div className="pricing-after fade-me ">
						<img
							src={require("../assets/images/rectangle-01.svg").default}
							alt="dummy"
						/>
					</div>
				</div>
				<div className="terms-desc">
					<div className="terms-before fade-me">
						<img
							src={require("../assets/images/rectangle-02.svg").default}
							alt="dummy"
						/>
					</div>
                       <div dangerouslySetInnerHTML={{ __html: seoData !== undefined ? seoData.content : "" }}></div>
					<div className="terms-after fade-me">
						<img
							src={require("../assets/images/path-3.svg").default}
							alt="dummy"
						/>
					</div>
				</div>
			</div>
		</section>
		</>
	);
};

export default TOS;
