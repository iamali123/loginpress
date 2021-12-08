import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { GRAPHQL_API } from "../Api/Client";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet"; 
import Loader from "../Loader-Components/Loader";
import BlogSidebar from "./BlogSidebar";
 
 
const BlogCategory = () => {
 
    let { blogCId } = useParams();
    useEffect(() => {
        //   console.log("BlogCategory", blogCId);
    }, [blogCId]);
 
    const BLOGC_QUERY = `
    {
        category(id: "${blogCId}", idType: SLUG) {
            posts {
                nodes {
                    title
                    slug
                    uri
                }
            }
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
                    uri
                }
            }
        }
      }
    `;
 
    const [blogCatData, setblogCatData] = useState();
	const [seoData, setseoData] = useState();

    useEffect(() => {
        async function fetchMyAPI() {
            await axios
                .post(GRAPHQL_API, { query: BLOGC_QUERY })
                .then((res) => {
                    setblogCatData(res.data.data.category.posts.nodes);
					setseoData(res.data.data.category.seo);
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
        <div className="doc-single-wrapper">
        <div className="inner-wrap">
        <div className="lp-single-content">
        <div className="lg-content-holder">
		<h2>Blog Categories</h2>
            <ul className="lp-doc-list">

        { blogCatData !== undefined
                    ? blogCatData.map((item, index) => {
                    return (
                            <li key={index}>
                                <Link to={item.uri}>
                                        {item.title}
                                </Link>
                            </li>
                    );
                      })
                    : <Loader /> }   
            </ul>
        </div>
    </div>
    <BlogSidebar archiveLink={blogCId} />
            </div>
        </div>
		</>
    )
}
 
export default BlogCategory