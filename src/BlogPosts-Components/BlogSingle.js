import React, { useState, useEffect } from 'react'
import axios from "axios";
import { GRAPHQL_API } from "../Api/Client";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet"; 
import './blogsingle.css';
import { useFormik } from "formik";
import SuccessMessage from './SuccessMessage';
import BlogSidebar from './BlogSidebar';

const BlogSingle = (  ) => {

	let { blogId } = useParams();
	useEffect(() => {
		//    console.log("doc", blogId);
	}, [blogId]);

	const BLOGSINGLE_QUERY = `
	{
		postsBy(uri: "${blogId}") {
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
			content
			title
			slug
			modified
			categories {
			  nodes {
				uri
				name
			  }
			}
			comments {
			  nodes {
				date
				content
				replies {
				  nodes {
					content
					date
				  }
				}
				author {
				  node {
					name
				  }
				}
			  }
			}
		  }
	  }
	`;

	const [blogSingleData, setblogSingleData] = useState();
	const [seoData, setseoData] = useState();
	const [commentsData, setCommentsData] = useState();
	const [successMsg, setsuccessMsg] = React.useState(true);


	useEffect(() => {
		async function fetchMyAPI() {
			await axios
				.post(GRAPHQL_API, { query: BLOGSINGLE_QUERY })
				.then((res) => {
					setblogSingleData(res.data.data.postsBy);
					setseoData(res.data.data.postsBy.seo);
					setCommentsData(res.data.data.postsBy.comments.nodes);
					console.log("Post Single", res.data.data.postsBy);
				})
				.catch((error) => {
					console.log("Error", error);
				});
		}
		fetchMyAPI();
	},[]);


	const createRequest = (values) => {
		const QUERY_3 =
			`
			mutation CREATE_COMMENT {
				createComment(input: 
					{
				commentOn: 230439,
				content: "` +
				values[`comment`] +
				`",
				author: "` +
				values[`name`] +
				`",
				authorEmail: "` +
				values[`email`] +
				`",
					 authorUrl: "` +
					 values[`website`] +
					 `"
					 })
				 {
				  success
				}
			  }
		`;
		axios
			.post(GRAPHQL_API, { query: QUERY_3 }, values)
			.then((res) => {
				console.log("responseData", res);
			})
			.catch((error) => {
				console.log("Error", error);
			});
	};

	const formSubmit = (values) => {
		createRequest(values);
	};

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			website: '',
			comment: '',
		  },
		onSubmit: (values, { resetForm }) => {
		formSubmit(values);
		resetForm();
		setsuccessMsg(false);
		},
	});

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
					 <div className="lg-doc">
						<h3 className="h5"> {blogSingleData !== undefined ? blogSingleData.title :  ""} </h3>
						<div className="lg-doc-content"
							dangerouslySetInnerHTML={{ __html: blogSingleData !== undefined ? blogSingleData.content : ""}} ></div>
					</div> 
				</div>
				 <div className="comments-wrapper">
				<h2>	{
			commentsData !== undefined ? commentsData.length : "" } Comments</h2>
			{
			commentsData !== undefined ? ( 
				
				commentsData.map((item, index) => {
					let date = item.date;
              const formateDate = ( rawDate ) => {
	         const monthNames = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December" ];
	            let _date = new Date(rawDate);
              	return monthNames[_date.getMonth()] + ' ' + _date.getDay() + ', ' + _date.getFullYear(); }
             return (
					<div className="single-comment" key={index}>
					<h3 className="h4">{item.author.node.name}</h3> 
					<h3 className="h6">{formateDate(date)}</h3>
					<div className="lg-doc-content"
					 dangerouslySetInnerHTML={{ __html: item.content}}  ></div>
					
                          {/* <div className="replies">
						   {item.replies.nodes.map((subItem, subIndex) => {
							return (
									<div key={subIndex}>
											<h3></h3>	
									</div> ); })} 
						  </div> */}
						  </div>	);  }) ) : ( "" ) }  
			
			<div className="comments-form">
			{successMsg === true ? (
				<form onSubmit={formik.handleSubmit}>
				<div className="form-block">
						<label htmlFor="name">Name</label>
						<input type="text" name="name" id="name" placeholder="Name"
						{...formik.getFieldProps('name')}
						/>
				</div>
				<div className="form-block">
							<label htmlFor="email">Email</label>
							<input type="text" name="email" id="email" placeholder="Email" 
						{...formik.getFieldProps('email')}
							/>
				</div>
				<div className="form-block">
							<label htmlFor="website">Website</label>
							<input type="text" name="website" id="website" placeholder="Website" 
						{...formik.getFieldProps('website')}
							/>
				</div>
				<div className="form-block full">
							<label htmlFor="comment">Comment</label>
							<textarea placeholder="comment" id="comment" 
								{...formik.getFieldProps('comment')}
							/>
				</div>
				<div className="form-submit">
						     <input type="submit" defaultValue="Submit" className="btn-large" />
				</div>
			</form>
			) : (
                     <SuccessMessage />
			)}
			</div>
			</div>
			</div>
            <BlogSidebar blogLink={blogId} />

		</div>  
		</div>
		</>
	);
};

export default BlogSingle
