import { useEffect, useRef, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import ArticleCard from "./ArticleCard";
import Loader from "@/components/Loader";
import { formatArticles } from "@/utils/utils";
import useArticleSearch from "../hooks/useArticleSearch";

const ArticleSearchModal = ({ isOpen, onClose }) => {
	const searchInputRef = useRef(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedTerm, setDebouncedTerm] = useState("");

	useEffect(() => {
		const handler = setTimeout(() => setDebouncedTerm(searchTerm), 1000);
		return () => clearTimeout(handler);
	}, [searchTerm]);

	const { data, isLoading, isError } = useArticleSearch(debouncedTerm);

	if (!isOpen) return null;

	let searchedArticles = data?.articles || [];
	searchedArticles = formatArticles(searchedArticles);

	return (
		<div
			className="fixed top-0 left-0 w-full h-full z-[100] bg-black bg-opacity-50 py-10 px-4 overflow-y-auto"
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}>
			<div className="w-full max-w-[900px] mx-auto bg-[#F3F1E8] dark:bg-[#1F1F1F] relative">
				<form action="">
					<div className="flex items-center gap-2.5 px-5 py-2.5 border-2 border-black dark:border-[#aaa] relative">
						<FaSearch />
						<input
							ref={searchInputRef}
							type="text"
							placeholder="Search articles..."
							className="w-full p-2 bg-transparent focus:outline-none focus:border-blue-500 uppercase font-bold placeholder:uppercase placeholder:text-zinc-700 title"
							onChange={(e) => setSearchTerm(e.target.value)}
							autoFocus
						/>
						{searchInputRef.current && searchInputRef.current.value && (
							<button
								onClick={() => {
									setSearchTerm("");
									searchInputRef.current.value = "";
								}}
								type="button"
								className="w-[25px] h-[25px] text-black dark:text-white hover:text-gray-500 absolute right-5 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center">
								<FaTimes />
							</button>
						)}
					</div>
					<div className="border-2 border-black dark:border-[#aaa] border-t-0">
						{debouncedTerm.trim() && (
							<div className="px-5 py-2.5 border-b-2 border-black">
								<h2 className="text-2xl font-bold mb-1">Searched Results: {searchedArticles.length}</h2>
								<p className="mb-0">
									Showing results for: <strong>{debouncedTerm}</strong>
								</p>
							</div>
						)}
						{isLoading ? (
							<div className="w-full h-full flex flex-col items-center justify-center py-5">
								<div className="h-[100px] flex justify-center items-center overflow-hidden">
									<Loader />
								</div>
							</div>
						) : isError ? (
							<div className="w-full h-full flex items-center justify-center py-5">
								<p className="uppercase mb-0 text-red-600">Error loading articles</p>
							</div>
						) : searchedArticles.length > 0 ? (
							<div className="px-5 py-2.5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto overflow-x-hidden">
								{searchedArticles.map((article) => (
									<div
										onClick={onClose}
										className=""
										key={article.id}>
										<ArticleCard article={article} />
									</div>
								))}
							</div>
						) : (
							<div className="w-full h-full flex items-center justify-center py-10 title">
								<p className="uppercase mb-0">No recent search</p>
							</div>
						)}
					</div>
				</form>
				<div className="absolute top-0 left-0 w-full h-full -z-10 translate-x-[4px] translate-y-[4px] bg-black dark:bg-[#aaa]"></div>
			</div>
		</div>
	);
};

export default ArticleSearchModal;
