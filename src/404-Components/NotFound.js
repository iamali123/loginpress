import React from "react";
import './pageNotFound.css'


const NotFound = () => {
	return (
		<>
				<div className="hero-search">
			<div className="wrap">
				<div className="faq-before fade-me">
					<img
						src={require("../assets/images/faq-before.svg").default}
						alt="dummy"
					/>
				</div>
				<h1>Not Found</h1>
				<div className="faq-after fade-me">
					<img
						src={require("../assets/images/faq-after.svg").default}
						alt="dummy"
					/>
				</div>
			</div>
		</div>
	 <div className="page-not-found">
	 <div className="inner-wrap">

			<h1>404 Error Page</h1>
			<p>The content you are looking for might have a new home or no longer exist. </p>

<p>Head back to our <a href="/">home page</a> to explore Postino. </p>
			</div>
			</div>
			</>
	
	);
};

export default NotFound;
