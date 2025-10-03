import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onModalClick }) => {
	return (
		<div
			onClick={() => onModalClick()} 
			className=" relative">
			<div className=" bg-[#F3F1E8] dark:bg-[#1F1F1F]  border-2 border-black dark:border-[#aaa] relative z-10 translate-x-[-3px] translate-y-[-3px] focus-within:translate-x-0 focus-within:translate-y-0 transition-all">
				<div className="flex items-center gap-2.5 p-2.5 cursor-pointer">
					<FaSearch />
					<span className=" uppercase font-semibold title">Search articles</span>
				</div>
			</div>
			<div className=" w-full h-full bg-black dark:bg-[#aaa] absolute top-0 left-0"></div>
		</div>
	);
};

export default SearchBar;
