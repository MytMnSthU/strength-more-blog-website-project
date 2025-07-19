import { useEffect, useRef, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import request from "graphql-request";
import { SEARCH_ARTICLES } from "../graphql/query";

import ArticleBoxCard from "./ArticleBoxCard";

import ArticleCard from "./ArticleCard";

const SearchModal = ({ isOpen, onClose }) => {
	const searchInputRef = useRef(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchedArticles, setSearchedArticles] = useState([]);

	const handleBackgroundClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	// useEffect(() => {
	// 	const fetchSearchedArticles = async () => {
	// 		if (!searchInputRef.current) return;
	// 		if (!searchInputRef.current.value.trim()) {
	// 			setSearchedArticles([]);
	// 			return;
	// 		}

	// 		try {
	// 			const endpoint = import.meta.env.VITE_API_KEY;
	// 			const searchTerm = searchInputRef.current.value.trim();
	// 			const data = await request(endpoint, SEARCH_ARTICLES, { _search: searchTerm });
	// 			setSearchedArticles(data.articles);
	// 		} catch (error) {
	// 			console.error("Error fetching searched articles:", error);
	// 		}
	// 	};

	// 	const debounceFetch = setTimeout(fetchSearchedArticles, 300);

	// 	console.log("Debounced search for:", searchInputRef.current.value);

	// 	return () => clearTimeout(debounceFetch);
	// }, [searchInputRef.current?.value]);

	useEffect(() => {
		const fetchSearchedArticles = async () => {
			if (!searchTerm.trim()) {
				setSearchedArticles([]);
				return;
			}

			try {
				const endpoint = import.meta.env.VITE_API_KEY;
				const data = await request(endpoint, SEARCH_ARTICLES, { _search: searchTerm });
				setSearchedArticles(data.articles);
			} catch (error) {
				console.error("Error fetching searched articles:", error);
			}
		};

		const debounceFetch = setTimeout(fetchSearchedArticles, 300);

		return () => clearTimeout(debounceFetch);
	}, [searchTerm]);

	if (!isOpen) return null;

	return (
		<div
			className=" fixed top-0 left-0 w-full h-full z-[100] bg-black bg-opacity-50 py-10 px-4 overflow-y-auto"
			onClick={handleBackgroundClick}>
			<div className="w-full max-w-[1140px] mx-auto bg-[#F3F1E8] relative">
				<form action="">
					<div className="flex items-center gap-2.5 px-5 py-2.5  border-2 border-black relative">
						<FaSearch />
						<input
							ref={searchInputRef}
							type="text"
							placeholder="Search articles..."
							className=" w-full p-2 bg-transparent focus:outline-none focus:border-blue-500 uppercase font-bold placeholder:uppercase placeholder:text-zinc-700"
							onChange={(e) => {
								const value = e.target.value;
								setSearchTerm(value);
							}}
							autoFocus
						/>
						<button
							onClick={() => {
								setSearchTerm("");
								setSearchedArticles([]);
								searchInputRef.current.value = "";
							}}
							type="button"
							className=" w-[25px] h-[25px] text-gray-500 hover:text-black absolute right-5 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center">
							<FaTimes />
						</button>
					</div>
					<div className="p-5 border-2 border-black border-t-0">
						{searchedArticles.length > 0 && (
							<div>
								<h2 className=" text-2xl font-bold mb-3	">Search Results: {searchedArticles.length}</h2>
								<p className=" text-gray-500">
									Showing results for: <strong>{searchTerm}</strong>
								</p>
							</div>
						)}
						<div
							onClick={() => {
								onClose();
							}}
							className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5  h-fit max-h-[400px] overflow-y-auto overflow-x-hidden mt-5">
							{searchedArticles.length > 0 ? (
								searchedArticles.map((article) => (
									//<ArticleBoxCard key={article.id} article={article} />
									<ArticleCard
										key={article.id}
										article={article}
									/>
								))
							) : (
								<div className=" min-h-[100px] flex items-center justify-center">
									<p className=" text-gray-500 uppercase">No recent search</p>
								</div>
							)}
						</div>
					</div>
				</form>

				<div className="absolute top-0 left-0 w-full h-full -z-10 translate-x-[4px] translate-y-[4px] bg-black"></div>
			</div>
		</div>
	);
};

export default SearchModal;
