import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { slideToggle, slideUp } from "../assets/js/slideToggle";


const Sidebar = ({ archiveLink, docLink }) => {

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
	
	const [DocData, setDocData] = useState();
	var apiDocData = useSelector((record) => record.apiReducer);

	useEffect(() => {
		async function fetchMyAPI() {
			if (apiDocData.length !== 0) {
				setDocData(apiDocData.docsCategory.edges);
			}
		}
		fetchMyAPI().then(e=> {
			docToggle()
		});
	}, [apiDocData]);

	return (
		<div className="lp-side-bar">
			<h5>Documentation</h5>
			{DocData !== undefined
				? DocData.map((item, index) => {
						let activeLink =
							item.node.uri === `/docs-category/${archiveLink}/` ? " lp-open" : "";
						let parentItem = item.node.docs.nodes;
						let thisActive = false;
						parentItem.forEach((e) => {
							if (e.uri === `/doc/${docLink}/`) {
								thisActive = true;
							}
						});

						let activeItem = thisActive ? " lp-open" : "";

						return (
							<div
								className={"lg-doc-accordion" + activeLink + activeItem} key={index} >
								<h6>{item.node.name}</h6>
								<ul>
									{item.node.docs.nodes.map((subItem, subIndex) => {
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
						);
				  })
				: ""}
		</div>
	);
};

export default Sidebar;
