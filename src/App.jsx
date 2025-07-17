import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import request, { gql } from "graphql-request";

import { ScrollTopContext } from "./components/ScrollTopContext";

import Nav from "./components/Nav";
import Loader from "./components/Loader";
import ArticleDetail from "./components/ArticleDetail";
import SideBar from "./components/SideBar";
import ArticleList from "./components/ArticleList";
import FilterArticleList from "./components/FilterArticleList";
import Footer from "./components/Footer";
import CategoryList from "./components/CategoryList";
import { formatDate } from "./utils/utils";

import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GET_ARTICLES, GET_CATEGORIES } from "./graphql/query";

const defaultGetQuery = GET_ARTICLES;
const getCategoriesQuery = GET_CATEGORIES;

const queryClient = new QueryClient();

const App = () => {
	const [articles, setArticles] = useState([]);
	const [categories, setCategories] = useState([]);


	const [currentArticlesCount, setCurrentArticlesCount] = useState(8);
	const [maxArticlesCount, setMaxArticlesCount] = useState(0);
	const [isDisable, setIsDisable] = useState(false);
	const [loading, setLoading] = useState(true);
	const [btnLoading, setBtnLoading] = useState(false);

	const scrollContainerRef = useRef(null);

	const popularArticles = articles?.filter((article) => article.popularArticle === true);

	const fetchData = async ({ query = defaultGetQuery, limit = 8, skip = 4 } = {}) => {
		try {
			const endpoint = import.meta.env.VITE_API_KEY;

			const data = await request(endpoint, query, {
				limit,
				skip
			});

			return data;
		} catch (error) {
			console.error(error);
		}
	};

	const fetchAndSetArticles = async (query) => {
		try {
			const data = await fetchData(query);

			const fetchedArticles = data.articles;

			const formattedArticles = fetchedArticles.map((article) => {
				const newArticle = {
					...article,
					createdAt: formatDate(article.createdAt),
					comments: article.comments.map((comment) => {
						const newComment = {
							...comment,
							createdAt: formatDate(comment.createdAt),
						};
						return newComment;
					}),
				};

				return newArticle;
			});

			setArticles(formattedArticles);
			setLoading(false);
			setBtnLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchAndSetCategories = async (query) => {
		try {
			const data = await fetchData({query});

			const fetchedCategories = data.categories;

			setCategories(fetchedCategories);
		} catch (error) {
			console.error(error);
		}
	};

	const searchArticles = (searchTerm) => {
		const searchedArticles = articles.filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()));
		return searchedArticles;
	};

	const fetchAndSetArticlesTotal = async () => {
		const getArticlesTotalQuery = gql`
			query GetArticlesTotal {
				articlesConnection(stage: PUBLISHED) {
					aggregate {
						count
					}
				}
			}
		`;

		const data = await fetchData({query: getArticlesTotalQuery});
		const newMaxArticlesCount = data.articlesConnection.aggregate.count;
		setMaxArticlesCount(newMaxArticlesCount);
	};

	const moreBlog = () => {
		let newTotal = currentArticlesCount + 4;
		setCurrentArticlesCount(newTotal);

		if (maxArticlesCount === currentArticlesCount + 4 || maxArticlesCount < currentArticlesCount + 4) {
			setIsDisable(true);
		}
	};

	const scrollToTop = () => {
		scrollContainerRef.current.scrollIntoView({
			block: "start",
		});
	};

	useEffect(() => {
		fetchAndSetCategories(getCategoriesQuery);
		fetchAndSetArticlesTotal();
	}, [currentArticlesCount]);

	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ScrollTopContext.Provider value={scrollToTop}>
					<div
						ref={scrollContainerRef}
						className="bg-[#F3F1E8] h-max border border-black">
						<Nav />

						<div className=" container grid lg:grid-cols-3  gap-5 p-2.5 mx-auto sm:pb-20">
							<div className=" sm:col-span-2">
								<Routes>
									<Route
										path="/"
										element={
											<ArticleList
												title="Recent Articles"
												moreBlog={moreBlog}
												isDisable={isDisable}
												btnLoading={btnLoading}
												setBtnLoading={setBtnLoading}
												fetchData={fetchData}
											/>
										}
									/>
									<Route
										path="/articles/:articleId"
										element={<ArticleDetail fetchAndSetArticles={fetchAndSetArticles} />}
									/>
									<Route
										path="/articles/popular"
										element={
											<ArticleList
												title="Popular Articles"
												articles={popularArticles}
											/>
										}
									/>
									<Route
										path="/categories/:categoryId"
										element={
											<FilterArticleList
												articles={articles}
												setArticles={setArticles}
											/>
										}
									/>
									<Route
										path="/categories"
										element={<CategoryList categories={categories} />}
									/>
								</Routes>
							</div>

							<SideBar
								categories={categories}
								popularArticles={popularArticles}
								searchArticles={searchArticles}
								fetchData={fetchData}
							/>
						</div>

						<Footer categories={categories} />
					</div>
				</ScrollTopContext.Provider>
			</QueryClientProvider>
		</BrowserRouter>
	);
};

export default App;
