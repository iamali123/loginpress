import React, { useState, useEffect } from 'react'
import Faq from '../Home-Components/Faq/Faq';
import SearchPageHero from './SearchPageHero';
import SearchContent from './SearchContent'
import { useLocation } from 'react-router-dom'

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const SerachPageApp = () => {
	const query = useQuery()
	const [word, setword] = useState(query.get("word"))

	useEffect(() => {
		setword(query.get("word"))
		// console.log("query updated:", query.get("word"))
	}, [query])


	return (
		<>
			<SearchPageHero word={word} setword={setword} />
			<SearchContent word={word} />
			<Faq />
		</>
	)
}

export default SerachPageApp
