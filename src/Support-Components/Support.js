import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Support.css";
import Animation from "../Animation-Component/Animation";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { GET_SUPPORT_API} from "../Redux/constants";
import { GRAPHQL_API, SUPPORT_QUERY } from "../Api/Client";
import { useSelector } from "react-redux";
import Loader from "../Loader-Components/Loader";

const Support = () => {
	Animation();
	var dispatch = useDispatch();

	
	useEffect(() => {
		const fetchSupportQuery = () => {
			axios
				.post(GRAPHQL_API, { query: SUPPORT_QUERY })
				.then((res) => {
					if (res.status === 200) {
						dispatch({ type: GET_SUPPORT_API, payload: res.data.data });
					}
				})
				.catch((error) => {
					console.log("error", error);
				});
		}
		fetchSupportQuery();
	},[dispatch] );

	const [seoData, setSeoData] = useState();
	const [seoContent, setContent] = useState();

	var apiSupportData = useSelector((record) => record.SupportReducer);
	useEffect(() => {
		if (apiSupportData.length !== 0) {
			setSeoData(apiSupportData.page.seo);
			setContent(apiSupportData.page.support);	
		}
	}, [apiSupportData]);

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
			<section className="support">
				<div className="inner-wrap">
					<div className="feature-info">
						<div className="feature-before fade-me">
							<img
								src={require("../assets/images/faq-before.svg").default}
								alt="dummy"
							/>
						</div>
						<div className="feature-head">
							{  seoContent !== undefined ? 
							<h1>{seoContent.heading}</h1>
						
							: "" }
							<div className="feature-desc">
							{  seoContent !== undefined ? 
								<p>
									{seoContent.subHeading}
								</p>
								: "" }
							</div>
							
						</div>
						<div className="feature-after fade-me">
							<img
								src={require("../assets/images/faq-after.svg").default}
								alt="dummy"
							/>
						</div>
					</div>
				</div>
				<div className="inner-wrap">
					<div className="support-wrapper">
			
					{  seoContent !== undefined ? 
					 seoContent.section.map((item, index) => {
						return (
						<div className="support-box" key={index}>
						
							<Link to={item.link} className="support-inner">
								<div className="support-icon">
									<img
										src={item.image.sourceUrl}
										alt={item.image.title}
									/>
								</div>
								<div className="support-content">
									<h2 className="h4">{item.title}</h2>
								</div>
							</Link>
						</div>)
							})
						: <Loader /> 
						}
					</div>
				</div>
			</section>
		</>
	);
};

export default Support;
