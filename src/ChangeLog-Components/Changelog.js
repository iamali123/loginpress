
import React, { useState, useEffect, useRef } from "react";
import "./Changelog.css";
import axios from "axios";
import Animation from "../Animation-Component/Animation";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import {  GET_CHANGELOG_API } from "../Redux/constants";
import { GRAPHQL_API, CHANGELOG_QUERY } from "../Api/Client";
import Loader from "../Loader-Components/Loader";
import { Helmet } from "react-helmet";

const Changelog = () => {

	// var stepTime = 20;
	// var docBody = document.body;
	// var focElem = document.documentElement;

	// var scrollAnimationStep = function (initPos, stepAmount) {
	// 	var newPos = initPos - stepAmount > 0 ? initPos - stepAmount : 100;
	// 	docBody.scrollTop = focElem.scrollTop = newPos;
	// 	newPos &&
	// 		setTimeout(function () {
	// 			scrollAnimationStep(newPos, stepAmount);
	// 		}, stepTime);
	// };
	// var scrollTopAnimated = function (speed) {
	// 	var topOffset = docBody.scrollTop || focElem.scrollTop;
	// 	var stepAmount = topOffset;
	// 	speed && (stepAmount = (topOffset * stepTime) / speed);
	// 	scrollAnimationStep(topOffset, stepAmount);
	// };

	//  Api Calls 
	var dispatch = useDispatch();

	useEffect(() => {
		const fetchChangelogQuery = () => {
			axios
				.post(GRAPHQL_API, { query: CHANGELOG_QUERY })
				.then((res) => {
					if (res.status === 200) {
						dispatch({ type: GET_CHANGELOG_API, payload: res.data.data });
					}
				})
				.catch((error) => {
					 console.log("error", error);
				});
		}
		fetchChangelogQuery();
	}, []);

	Animation();

	const changeLogRef = useRef(null);
	const executeScroll = () => scrollToRef(changeLogRef);
	const scrollToRef = (ref) => {
		if (null === lastLogItem) return;
		// window.scrollTo(0, ref.current.offsetTop);
		ref.current.scrollIntoView({ behavior: 'smooth' })
	}

	// States.
	const [ChangeLogData, setChangeLogData] = useState();
	const [seoData, setseoData] = useState();
    const [lastLogItem, setlastLogItem] = useState(null);
	const [token, setToken] = useState([]);
	const [hasNext, setHasNext] = useState(true)
	const [cLoader, setcLoader] = useState(false)

	var ApiChangeLogData = useSelector((record) => record.ChangeLogReducer);

	useEffect(() => {
		async function fetchMyAPI() {
		if (ApiChangeLogData.length !== 0){ 
			let logData = ApiChangeLogData?.changelogs?.edges;
			 let lastItem = logData.length - 1;
		
			setToken(ApiChangeLogData?.changelogs?.pageInfo.endCursor ?? null);
			setlastLogItem(lastItem);
			setChangeLogData(logData ?? []);
			setseoData(ApiChangeLogData.acfOptionsArchiveSeo.archiveSeo.changeLog)
		}
	}
	fetchMyAPI()
	}, [ApiChangeLogData])
	
	const viewMoreHandler = () => {
		// console.log("TOKEN", token);
		var QUERY_5 = `{
			changelogs(where: {orderby: {field: DATE, order: DESC}}, first: 10, after: "${token}") {
				edges {
				  node {
					date
					title
					changelogCategories {
					  nodes {
						label: name
						class: slug
					  }
					}
					changeLog {
					  logContent {
						type
						content
					  }
					}
				  }
				}
				pageInfo {
				  endCursor
				  hasNextPage
				}
			  }
				}`;

		axios
		.post(GRAPHQL_API, { query: QUERY_5 })
		.then((res) => {
			let oldData = ChangeLogData;
			// console.log("Response Clicked", res)
			let lastItem = ChangeLogData.length - 1;

			setlastLogItem(lastItem);
			setChangeLogData([...ChangeLogData, ...res.data.data.changelogs.edges]);
			setToken(res?.data?.data?.changelogs?.pageInfo?.endCursor ?? [])
			if (res?.data?.data?.changelogs?.pageInfo.hasNextPage === false) {
				setHasNext(false)
			}
			// console.log("Reset Token", token)
		    executeScroll();

			setcLoader(false);
	
		})
		.catch((error) => {
			// console.log("Error", error);
		});
	};
	function spinner() {
		setcLoader(true);
    }

	return (
		<>
		{
		seoData !== undefined ? ( 
			<Helmet>
				<title>{seoData.title}</title>
				<meta name="description" content={seoData.metaDesc} />
				<meta  name="keywords" content={seoData.metaKeywords} />
				<meta  property="og:description" content={seoData.opengraphDescription} />
				<meta  property="og:image" content={seoData.opengraphImage} />
				<meta  property="og:title" content={seoData.opengraphTitle} />
				<meta  property="og:type" content={seoData.opengraphType} />
				<meta  property="og:url" content={seoData.opengraphUrl} />
				<meta  property="og:description" content={seoData.twitterDescription} />
				<meta  property="og:image"  content={seoData.twitterImage} />
				<meta  property="og:title" content={seoData.twitterTitle} />
			</Helmet>   
		)  : ""
		}

		<section className="changelog">
			<div className="inner-wrap">
				<div className="chnngelog-info">
					<div className="changelog-info-before fade-me ">
						<img
							src={require("../assets/images/rectangle-03.svg").default} alt="dummy" />
					</div>
					<div className="changelog-head">
						<h1>Changelog</h1>
						<div className="changelog-desc">
							<p>
								Try to find your solution with the frequently asked questions about our services.
							</p>
						</div>
					</div>
					<div className="changelog-info-after fade-me ">
						<img src={require("../assets/images/rectangle-01.svg").default} alt="dummy" />
					</div>
				</div>
				<div className="all-changelogs">
					<div className="all-changelogs-before fade-me ">
						<img src={require("../assets/images/changelog-before.svg").default} alt="dummy" />
					</div>
					<div className="all-changelogs-middle fade-me ">
						<img
							src={require("../assets/images/rectangle-376.svg").default} alt="dummy" />
					</div>
					<div className="changelog-list">
						{ChangeLogData !== undefined
							? ChangeLogData.map((item, index) => {
								// console.log(ChangeLogData);
								let date = item.node.date;

								const formateDate = ( rawDate ) => {
									const monthNames = ["January", "February", "March", "April", "May", "June",
									"July", "August", "September", "October", "November", "December"
								];
									let _date = new Date(rawDate);
									return monthNames[_date.getMonth()] + ' ' + _date.getDay() + ', ' + _date.getFullYear();
								}
								return (
									<div  className={`single-changelog ${index === lastLogItem ? "scrollTo" : ""}`}
										ref={index === lastLogItem ? changeLogRef : null}
										key={index}>
									

										<div className="changelog-date">
											<span className="version">{item.node.title}</span>
											<small className="date">{formateDate(date)}</small>
											<span className={"tag " + item.node.changelogCategories.nodes[0].class} >
											{item.node.changelogCategories.nodes[0].label}
										</span>
										</div>
										<div className="change-list" >
										{item.node.changeLog.logContent.map((subitem, subindex) => {
											return (
											
													<div className="what-change" key={subindex}>
														<span className={"label " + subitem.type}> {subitem.type} </span>
														<div dangerouslySetInnerHTML={{ __html: subitem.content }}></div>
													</div>
										
											);
										})}
										</div>
									</div>
								);
							})
							: <Loader />}
						<div className="more-changelogs">
							{ hasNext === true ?
							<a className="btn-large" onClick={()=>{viewMoreHandler(); spinner();}} >View More { cLoader === true ? <div class="cloader"> <div class="cloading"> </div> </div>: null } </a> 
							: null }
						</div>

					</div>
					<div className="all-changelogs-after fade-me ">
						<img
						src={require("../assets/images/path-167.svg").default}
						alt="dummy"
						/>
					</div>
				</div>
			</div>
		</section>
		</>
	);
};

export default Changelog;
