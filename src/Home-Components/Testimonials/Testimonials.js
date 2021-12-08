import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Testimonials = () => {

	let [description, setdescription] = useState();
	let [title, settitle] = useState();
	let [testimonial, settestimonial] = useState();
	let [viewMoreCta, setviewMoreCta] = useState();

	var apiTestimonialData = useSelector((record) => record.apiReducer);
	useEffect(() => {
		async function fetchMyAPI() {
			if (apiTestimonialData.length !== 0) {
				const  {  description, title, testimonial, viewMoreCta  } = apiTestimonialData.page.homePageMeta.testimonialsSection;
				setdescription(description);
				settitle(title);
				settestimonial(testimonial);
				setviewMoreCta(viewMoreCta);
			}
		}
		fetchMyAPI();
	}, [apiTestimonialData]);
	
	return (
		<section className="trusted-people">
			<div className="inner-wrap">
				<div className="trusted-info">
					<div className="trusted-before fade-me">
						<img
							src={require("../../assets/images/rectangle-02.svg").default}
							alt="dummy"
						/>
					</div>
					<div className="trusted-head">
						 <h2>{title}</h2> 
						 <div className="trusted-desc" dangerouslySetInnerHTML={{ __html: description }}>
						
						</div> 
					</div>
					<div className="trusted-after fade-me">
						<img
							src={require("../../assets/images/path-3.svg").default}
							alt="dummy"
						/>
					</div>
				</div>
				<div className="people-reviews">
					<div className="testimonials">
					{testimonial !== undefined

					? testimonial.map((item, index) => {
		
						return (
							<div className="review" key={index}>
								<div className="review-info">
									<h3 className="h6">{item.title}</h3>
									<div className="review-desc">
										<p>
											{item.description}
										</p>
									</div>
								</div>
								<div className="review-by">
									<h4 className="h6">{item.reviewBy}</h4>
							
									<div className="review-stars">
										<i className="fas fa-star" />
										<i className="fas fa-star" />
										<i className="fas fa-star" />
										<i className="fas fa-star" />
										<i className="fas fa-star" />
									</div>
								</div>
							</div>
						);
					}) : ""}  
					</div>
					<div className="view-more">
						<div className="view-more-before fade-me">
							<img
								src={require("../../assets/images/rectangle-010.svg").default}
								alt="dummy"
							/>
						</div>
					
						{ 	viewMoreCta !== undefined ? ( 
							
						 <a href={viewMoreCta.link} className="btn-large" target="_blank" rel="noreferrer">
							{viewMoreCta.text}
						</a> 
						):""
					} 
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
