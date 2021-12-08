import { useState, useEffect } from 'react'
import axios from "axios";
import { GRAPHQL_API } from "../Api/Client";
import { Link } from "react-router-dom";
import Loader from "../Loader-Components/Loader";
import { Helmet } from "react-helmet"; 

const BlogPost = () => {

	const BLOG_QUERY = `
	{
		categories {
			edges {
				node {
					name
					uri
					posts {
						nodes {
							title
							slug
							uri
							excerpt
						}
					}
				}
			}
		}
		acfOptionsArchiveSeo {
			archiveSeo {
				blogPosts {
					canonical
					fieldGroupName
					metadesc
					metakeywords
					metarobotsnofollow
					metarobotsnoindex
					opengraphauthor
					opengraphdescription
					opengraphpublisher
					opengraphsitename
					opengraphtitle
					opengraphtype
					opengraphurl
					title
					twitterdescription
					twittertitle
				}
			}
		}
	  }
	`;

	const [blogPostData, setblogPostData] = useState();
	const [seoData, setseoData] = useState();

	useEffect(() => {
		async function fetchMyAPI() {
			await axios
				.post(GRAPHQL_API, { query: BLOG_QUERY })
				.then((res) => {
					setblogPostData(res.data.data.categories.edges);
					setseoData(res.data.data.acfOptionsArchiveSeo.archiveSeo.blogPosts);
				})
				.catch((error) => {
					console.log("Error", error);
				});
		}
		fetchMyAPI();
	},[]);

	return (
		<>
		{ seoData !== undefined ? (
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
		<div className="doc-wraper">
			 <div className="inner-wrap">
				{
					
					blogPostData !== undefined ? (
						blogPostData.map((item, index) => {
		
						return (
							item.node.posts.nodes.length !== 0 ?
							<div className="col-3" key={index}>
								<div className="doc-box">
									<h5>{item.node.name}</h5>
									<div className="doc-inner">
										<ul>
											{item.node.posts.nodes.map((subItem, subIndex) => {
												return (
													<li key={subIndex}>
														<a href={subItem.uri}>
															{subItem.title}
															
														</a>
													</li>
												);
											})}
										</ul>
									</div>
									<div className="browse-all-wrapper">
										<Link to={item.node.uri} className="browe-all">
											{item.node.name}
										</Link>
									</div>
								</div>
							</div>
							: ""
						);
					})
				) : (
					<Loader />
				)}
			</div> 
		</div>
		</>
	)
}

export default BlogPost
