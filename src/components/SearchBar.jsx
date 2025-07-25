import { useRef, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import ArticleBoxCard from "./ArticleBoxCard";
import Loader from "./Loader";

const SearchBar = ({ onModalClick }) => {
	const searchInputRef = useRef(null);
	const [searchedArticles, setSearchedArticles] = useState([]);

	return (
		<div
			onClick={() => onModalClick()} 
			className=" relative">
			<div className=" bg-[#F3F1E8]  border-2 border-black relative z-10 translate-x-[-3px] translate-y-[-3px] focus-within:translate-x-0 focus-within:translate-y-0 transition-all">
				<div className="flex items-center gap-2.5 p-2.5 cursor-pointer">
					<FaSearch />
					<span className=" uppercase font-semibold">Search articles</span>
				</div>
			</div>
			<div className=" w-full h-full bg-black absolute top-0 left-0"></div>
		</div>
	);
};

export default SearchBar;
