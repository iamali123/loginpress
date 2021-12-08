import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { slideToggle, slideUp } from '../../assets/js/slideToggle';



const Faq = () => {
	
	const history = useLocation();
	const [FaqData, setFaqData] = useState();
	var apiFaqData = useSelector((record) => record.apiReducer);

	useEffect(() => {
		async function fetchMyAPI() {
			if (apiFaqData.length !== 0) {
				setFaqData(apiFaqData.faqs.edges);
			}
		}

		fetchMyAPI().then((e)=>{
			faqToggler();
		});
	}, [apiFaqData]);

	function faqToggler(){
		var acc = document.querySelectorAll(".faq-ques");
		var acc2 = document.querySelectorAll(".faq-ans");
		var i;
		
		for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function() {
			var panel = this.nextElementSibling;
			slideToggle(panel, 200);
			this.classList.toggle("active");
		
			acc2.forEach(function(el) {
				if (el.style.display !== "none" && el !== panel) slideUp(el, 200);
				if (el.style.display !== "none" && el !== panel) el.previousElementSibling.classList.remove("active");
			});
		});
		}
	}

	return (
		<section className="faq">
			<div className="wrap">
				<div className="faq-info">
					<div className="faq-before fade-me">
						<img
							src={require("../../assets/images/path-3.svg").default}
							alt="dummy"
						/>
					</div>
					<div className="faq-head">
						<h2>Frequently Asked Questions</h2>
						<div className="faq-desc">
					
								<p>
									Try to find your solution with the frequently asked questions
									about or services.
								</p>
							
						</div>
					</div>
				</div>
				<div className="all-questions">
					<div className="all-questions-before fade-me">
						<img
							src={require("../../assets/images/rectangle-02.svg").default}
							alt="dummy"
						/>
					</div>
					{history.pathname !== "/faqs/" ? (
								<div className="faq-list">
								{FaqData !== undefined
									? FaqData.slice(0, 5).map((item, index) => {
											return (index === 0 ? (
						
													<div className="faq-single-question" key={index}>
														<div className="faq-ques active">
															<h3>{item.node.title}</h3>
															<i className="fas fa-plus" />
														</div>
														<div className="faq-ans show-ans">
															<div
																className="ans-frame"
																dangerouslySetInnerHTML={{
																	__html: item.node.content,
																}}
															></div>
														</div>
													</div>
											) : (
												<div className="faq-single-question" key={index}>
													<div className="faq-ques">
														<h3>{item.node.title}</h3>
														<i className="fas fa-plus" />
													</div>
													<div className="faq-ans">
														<div
															className="ans-frame"
															dangerouslySetInnerHTML={{
																__html: item.node.content,
															}}
														></div>
													</div>
												</div>
											)
											)
									  })
									: ""}
							</div>
							) : (
					<div className="faq-list">
						{FaqData !== undefined
							? FaqData.map((item, index) => {
									return (index === 0 ? (
				
											<div className="faq-single-question" key={index}>
												<div className="faq-ques active">
													<h3>{item.node.title}</h3>
													<i className="fas fa-plus" />
												</div>
												<div className="faq-ans show-ans">
													<div
														className="ans-frame"
														dangerouslySetInnerHTML={{
															__html: item.node.content,
														}}
													></div>
												</div>
											</div>
									) : (
										<div className="faq-single-question" key={index}>
											<div className="faq-ques">
												<h3>{item.node.title}</h3>
												<i className="fas fa-plus" />
											</div>
											<div className="faq-ans">
												<div
													className="ans-frame"
													dangerouslySetInnerHTML={{
														__html: item.node.content,
													}}
												></div>
											</div>
										</div>
									)
									)
							  })
							: ""}
					</div>
					)}
					<div className="all-questions-after fade-me">
						<img
							src={require("../../assets/images/group-331.svg").default}
							alt="dummy"
						/>
					</div>
				</div>
				{history.pathname === "/contact/" ? (
	                        " "
				) : (
					<div className="faq-btns">
					<p>If you Still have Questions?</p>
					<Link to="/contact/" className="btn-large">
						Get In Touch
					</Link>
				</div>
				)}
			</div>
		</section>
	);
};

export default Faq;
