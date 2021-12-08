import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, NavLink  } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { GETAPI, GET_PPRICING_API, GET_MONETBACK_API } from "../Redux/constants";
import { GRAPHQL_API, QUERY, PRICING_QUERY, MONEY_BACK } from "../Api/Client";
import { useSelector } from "react-redux";
import { slideToggle } from '../assets/js/slideToggle';
import Loader from '../Loader-Components/Loader'

const Header = () => {

	window.addEventListener("load", () => {
		// Navbar Toggle
		let toggler = document.getElementById("toggler");
		toggler.addEventListener("click", toggleMenu);
		function toggleMenu() {
			document.querySelector("html").classList.toggle('menu-opened');
			let navbar = document.querySelector("#navBar");
			slideToggle(navbar, 200);
			console.log(navbar);
			toggler.classList.toggle("open");
		}

	});

	//  Api Calls 
	var dispatch = useDispatch();

	useEffect(() => {
		const fetchMainQuery = () => {
			axios
				.post(GRAPHQL_API, { query: QUERY })
				.then((res) => {
					if (res.status === 200) {
						dispatch({ type: GETAPI, payload: res.data.data });
					}
				})
				.catch((error) => {
					console.log("error", error);
				});
		}
		fetchMainQuery();

	},[dispatch] );
	useEffect(() => {
		const fetchPricingQuery = () => {
			axios
				.post(GRAPHQL_API, { query: PRICING_QUERY })
				.then((res) => {
					if (res.status === 200) {
						dispatch({ type: GET_PPRICING_API, payload: res.data.data });
					}
				})
				.catch((error) => {
					console.log("error", error);
				});
		}
		fetchPricingQuery();

	},[dispatch] );
	useEffect(() => {
		const fetchMoneyBackQuery = () => {
			axios
				.post(GRAPHQL_API, { query: MONEY_BACK })
				.then((res) => {
					if (res.status === 200) {
						dispatch({ type: GET_MONETBACK_API, payload: res.data.data });
					}
				})
				.catch((error) => {
					console.log("error", error);
				});
		}
		fetchMoneyBackQuery();
	}, [dispatch]);

    //  Api Calls   

    const [Logo, setLogo] = useState({});
    const [navItems, setNavItems] = useState();
    const [samllMenu, setSmallMenu] = useState();

	var apiHeaderData = useSelector((record) => record.apiReducer);
	useEffect(() => {
		if (apiHeaderData.length !== 0) {
			setLogo(apiHeaderData.logo.loginpressGeneralSettings.loginpressLogo);
			setNavItems(apiHeaderData.mainmenu.nodes[0].menuItems.edges);
			setSmallMenu(apiHeaderData.smallmenu.nodes[0].menuItems.edges);
		}
	}, [apiHeaderData]);

	const [isActive, setActive] = useState(false);

	const toggleClass = () => {
		setActive(!isActive);
	  };

	return (
		<header className="header">
			<div className="wrap">
				<div className="brand">
					{Logo !== undefined ? (
						<Link to="/" className="logo">
							<img src={Logo.mediaItemUrl} alt={Logo.altText} />
						</Link>
					) : (
						""
					)}
					{/* Navbar Toggler */}
					<div id="toggler" className="toggle-navbar">
						<div className="icon" />
					</div>
				</div>
				{/* Navbar */}
				<nav className="navbar" id="navBar">
					<ul className="menu main-menu">
						{navItems !== undefined
							? navItems.map((item, index) => {
								let itemClass = item.node.childItems.nodes.length ? "menu-item-has-children" : "";
								let check = itemClass.length ? React.createElement("span", { className: "has-arrow" }, "", [React.createElement("i", { className: "fas fa-chevron-down", key: "index"},  ""),]) : "";
								return item.node.parentId === null ? (
									<li key={index} className={itemClass}>
										<NavLink to={item.node.path} activeClassName="active"> {item.node.label}</NavLink>
										<div className={isActive ? 'sub-menu-active': null} 
                                          onClick={toggleClass}>{check }</div>
										<ul className="sub-menu">
											{item.node.childItems.nodes.map((subItem, subIndex) => {
												return (
													<li key={subIndex}>
														<NavLink to={subItem.path}>
															<div className="sub-menu-thumbnail">
																<img src={subItem.navMenuItem.loginpressSpanIcon.sourceUrl} alt="" />
															</div>
															<div className="sub-menu-body">
																<h4>{subItem.label}</h4>
																<p>{subItem.description}</p>
															</div>
														</NavLink>
													</li>
												);
											})}
										</ul>
									</li>
								) : (
									<div key={index} />
								);
							})
							: <Loader />}
					</ul>
					<ul className="menu second-menu">
						{samllMenu !== undefined
							? samllMenu.map((item, index) => {
								return index === 0 ? (
									<li key={index}>
										<a href={item.node.url} target={item.node.target.toString()} className="login-btn">
											{item.node.label}
										</a>
									</li>
								) : (
									<li className="btn-header" key={index}>
										<a href={item.node.url} target={item.node.target.toString()}>{item.node.label}</a>
									</li>
								);
							})
							: null}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
