import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onModalClick }) => {
	return (
		<div
			onClick={() => onModalClick()} 
			className=" relative">
			<div className=" bg-[#F3F1E8] dark:bg-[#1F1F1F]  border border-black/20 dark:borderwhite/20 rounded-lg relative z-10  focus-within:translate-x-0 focus-within:translate-y-0 transition-all">
				<div className="flex items-center gap-2.5 p-2.5 cursor-pointer">
					<FaSearch />
					<span className=" uppercase font-semibold title">Search articles</span>
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
