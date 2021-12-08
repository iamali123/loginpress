import React, { useState, useEffect, useParams } from "react";
import { Link } from "react-router-dom";
import { slideToggle, slideUp } from "../assets/js/slideToggle";
import axios from "axios";
import { GRAPHQL_API } from "../Api/Client";

const BlogSidebar = ({blogLink, archiveLink}) => {

	function docToggle() {
		var doc = document.querySelectorAll(".lg-doc-accordion h6");
		var doc2 = document.querySelectorAll(".lg-doc-accordion ul");
		var i;

		for (i = 0; i < doc.length; i++) {
			doc[i].addEventListener("click", function () {
				var panel = this.nextElementSibling;
				slideToggle(panel, 200);
				this.classList.toggle("lp-open");

				doc2.forEach(function (el) {
					if (el.style.display !== "none" && el !== panel) slideUp(el, 200);
					if (el.style.display !== "none" && el !== panel)
						el.previousElementSibling.classList.remove("lp-open");
				});
			});
		}
	}

 
    const BLOGC_QUERY = `
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
      }
    `;
	const [blogPostData, setblogPostData] = useState();

    useEffect(() => {
        async function fetchMyAPI() {
            await axios
                .post(GRAPHQL_API, { query: BLOGC_QUERY })
                .then((res) => {
					setblogPostData(res.data.data.categories.edges);
                })
                .catch((error) => {
                    console.log("Error", error);
                });
        }
        fetchMyAPI().then(e=> {
			docToggle()
		});
    },[]);


	return (
		<div className="lp-side-bar">
		<h5>Blog</h5>
		{blogPostData !== undefined
			? blogPostData.map((item, index) => {

			let activeLink =
						item.node.uri === `/blog-category/${archiveLink}/` ? " lp-open" : "";
						let parentItem = item.node.posts.nodes;
						let thisActive = false;
						parentItem.forEach((e) => {
							if (e.uri === `/blog/${blogLink}/`) {
								thisActive = true;
							}
						});
				let activeItem = thisActive ? " lp-open" : "";
					return (
						item.node.posts.nodes.length !== 0 ?
						<div
							className={"lg-doc-accordion" + activeLink + activeItem} key={index} >
							<h6>{item.node.name}</h6>
							<ul>
								{item.node.posts.nodes.map((subItem, subIndex) => {
									return (
										<li key={subIndex}>
											<Link to={subItem.uri}>
												{subItem.title}
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
						: ""
					);
			  })
			: ""}
	</div>
	)
}

export default BlogSidebar
