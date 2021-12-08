import React from "react";
import { useHistory } from 'react-router-dom'

const SearchPageHero = ({ word, setword }) => {
	const [data, setdata] = React.useState()
	const history = useHistory();
	return (
		<div className="hero-search">
			<div className="wrap">
				<h1>Search for "{word}"</h1>
				<form action="void:(0)" className="search-form" >
					<input type="text" name="s" placeholder="Search the knowledge base" value={data} onChange={(e) => { setdata(e.target.value) }} />
					<input type="submit" defaultValue="Search" onClick={() => {
						// setword(data)
						history.push(`/search?word=${data}`);
					}} />
				</form>
			</div>
		</div>
	);
};

export default SearchPageHero;
