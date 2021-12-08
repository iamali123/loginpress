import React, { useState, useEffect } from "react";
import "./Footer.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const Footer = () => {
	let [footerArea, setFooterArea] = useState();
	let [QuickLinks, setQuickLinks] = useState();
	let [SupportLinks, setSupportLinks] = useState();
	let [SocialMediaLinks, setSocialMediaLinks] = useState();
	let [FooterBar, setFooterBar] = useState();
	let [CtaLinks, setCtaLinks] = useState();
	let url = useLocation();
	var apiFooterData = useSelector((record) => record.apiReducer);
	useEffect(() => {
		async function fetchMyAPI() {
			if (apiFooterData.length !== 0) {
				const { footerArea1, quickLinks, supportLinks, socialLinks, footerBar } =
					apiFooterData.loginpressThemeSettings.loginpressGeneralSettings.footer;
				setFooterArea(footerArea1);
				setQuickLinks(quickLinks);
				setSupportLinks(supportLinks);
				setSocialMediaLinks(socialLinks);
				setFooterBar(footerBar.copyrightNote);
				setCtaLinks(footerBar.ctaLinks);
			}
		}
		fetchMyAPI()
	}, [apiFooterData]);
	useEffect(() => {
		// console.log("Location Change", url.pathname);
	}, [url])

	window.addEventListener("load", () => {
		var videoBtn = document.querySelectorAll(".play-btn");
		for (var i = 0; i < videoBtn.length; i++) {
			videoBtn[i].addEventListener("click", function (e) {
				e.preventDefault();
				var getLink = this.getAttribute("data-youtube");
				document.querySelector("#lp-video").setAttribute("src", getLink);
				document.querySelector("html").classList.add("lp-video-play");
			});
		}
		function closePop() {
			document.querySelector("#lp-video").setAttribute("src", "");
			document.querySelector("html").classList.remove("lp-video-play");
		}
		document.querySelector(".lp-cross").addEventListener("click", function (e) {
			closePop();
		});
		document
			.querySelector(".lp-video-overlay")
			.addEventListener("click", function (e) {
				closePop();
			});
	});

	var getYear = new Date().getFullYear();
	let NewFooterBar = `${FooterBar}`.replace(
		"[loginpress_current_year]",
		getYear
	);
	return (
		<footer className="footer">
			{/* Footer-top */}
			<div className="footer-top">
				<div className="wrap">
					<div
						className="col"
						dangerouslySetInnerHTML={{ __html: footerArea }}
					></div>
					<div className="col">
						<h3>Quick Links</h3>
						<ul className="footer-links">
							{QuickLinks !== undefined
								? QuickLinks.map((item, index) => {
				
									return (
										<li key={index}>
											<Link
												to={
												 item.menuLink
												}
												// to={
												// 	item.menuLink.endsWith("/")
												// 		? item.menuLink.substr(
												// 			0,
												// 			item.menuLink.length - 1
												// 		)
												// 		: item.menuLink
												// }
											>
												{item.menuText}
											</Link>
										</li>
									);
								})
								: ""}
						</ul>
					</div>
					<div className="col">
						<h3>Support</h3>
						<ul className="footer-links">
							{SupportLinks !== undefined
								? SupportLinks.map((item, index) => {
									let account = item.menuLink.startsWith("https://") ? "_blank" : "";
									return (
										<li key={index}>
											<a href={item.menuLink} target={account}>
												{item.menuText}
											</a>
										</li>
									);
								})
								: ""}
								<li><Link to="/blog">Blog</Link></li>
						</ul>
					</div>
					<div className="col">
						<h3>Social Media</h3>
						<ul className="footer-links social-links">
							{SocialMediaLinks !== undefined
								? SocialMediaLinks.map((item, index) => {
									return (
										<li key={index}>
											<a href={item.socialLink}  target="_blank" aria-label={item.label} rel="noreferrer">
												<i className={item.socialIconClass} />
											</a>
										</li>
									);
								})
								: ""}
						</ul>
					</div>
				</div>
			</div>
			{/* Copyright */}
			<div className="footer-copyright">
				<div className="wrap">
					<div className="copyright">
						<p>{NewFooterBar}</p>
					</div>
					<ul className="policy-menu">
						{CtaLinks !== undefined
							? CtaLinks.map((item, index) => {
								return (
									<li key={index}>
										<Link to={item.ctaLink}>{item.ctaText}</Link>
									</li>
								);
							})
							: ""}
					</ul>
				</div>
			</div>
			<div className="lp-video-popup">
				<div className="lp-cross" />
				<div className="lp-video-overlay" />
				<div className="lp-video-frame">
					<iframe
						id="lp-video"
						allow="autoplay"
						frameBorder={0}
						title="This is a unique title"
					/>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
