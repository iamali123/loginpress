import React, { useEffect } from 'react'

const Animation = () => {
	useEffect(() => {
		addAnimation();
	},[])
	var isInViewport = function (elem) {
		var distance = elem.getBoundingClientRect();
		return (
			distance.top >= 0 &&
			distance.left >= 0 &&
			distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			distance.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	};


	function addAnimation(event) {
		let fadeMe = document.querySelectorAll('.fade-me');
		fadeMe.forEach(function(el, n){
			if (isInViewport(el) === true) {
				el.classList.add('fadeIn');
			}
		});
	}
	window.addEventListener('scroll', addAnimation, false);
	return (
 <>
 </>
	)
}

export default Animation
