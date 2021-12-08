import React from "react";

const ContactHero = () => {
	return (
		<div className="contact-hero">
			<div className="inner-wrap">
				<div className="faq-before fade-me">
					<img
						src={require("../assets/images/faq-before.svg").default}
						alt="dummy"
					/>
				</div>
				<h1>Contact Us</h1>
				<div className="contact-desc">
					<p>
						Would you like to write for us or do you have suggestions about how
						to improve our website? We'd love to hear from you!
					</p>
				</div>
				<div className="faq-after fade-me">
					<img
						src={require("../assets/images/faq-after.svg").default}
						alt="dummy"
					/>
				</div>
			</div>
		</div>
	);
};

export default ContactHero;
