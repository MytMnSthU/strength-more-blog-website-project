import { useNavigate } from "react-router";
import ArticleBoxCard from "./ArticleBoxCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GET_POPULAR_ARTICLES } from "../graphql/query";
import { fetchData, formatArticles } from "../utils/utils";
import LoadMoreButton from "./LoadMoreButton";
import Loader from "./Loader";
import { useContext } from "react";
import { ThemedAppContext } from "../context/ThemedAppContext";

const ArticlesBox = ({ boxTitle }) => {
	const navigate = useNavigate();
	const { scrollToTop } = useContext(ThemedAppContext);

	const fetchMoreArticles = ({ pageParam = 0 }) => {
		return fetchData({ query: GET_POPULAR_ARTICLES, limit: 4, pageParam });
	};

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteQuery({
		queryKey: ["popularArticles"],
		queryFn: fetchMoreArticles,
		getNextPageParam: (lastPage, allPages) => {
			const allItems = allPages.flatMap((p) => p.articles);
			const totalLoaded = allItems.length;
			const pageSize = 4; // match your `count`
			const hasMore = lastPage.articles.length === pageSize;
			return hasMore ? totalLoaded : undefined;
		},
		refetchOnWindowFocus: false,
	});

	const formattedArticles = (() => {
		if (error) {
			console.error("Error fetching articles:", error);
			return (
				<div className=" text-red-700 px-4 py-3 relative my-4" role="alert">
					<strong className="font-bold">Error:</strong>
					<span className="block sm:inline ml-2 text-lg">Failed to load articles.</span>
				</div>
			);
		}
		if (isLoading) return (
			<div className=" w-full h-[200px] flex justify-center items-center  relative overflow-hidden">
				<Loader />
			</div>
		);

		if (!data?.pages?.length) {
			return <div>No popular articles found</div>;
		}

		const articles = data.pages.flatMap((page) => page.articles);
		return formatArticles(articles).map((article) => (
			<ArticleBoxCard
				key={article.id}
				article={article}
			/>
		));
	})();

	return (
		<div className=" relative">
			<div className=" bg-[#F3F1E8] dark:bg-[#1F1F1F] border-2 border-black dark:border-[#aaa] relative z-10">
				<span
					onClick={() => {
						navigate("/articles/popular");
						scrollToTop();
					}}
					className=" text-xl font-semibold uppercase block p-4 border-b-2 border-black dark:border-[#aaa] cursor-pointer">
					{boxTitle}
				</span>

				<div className="overflow-y-auto h-fit max-h-[47vh] flex flex-col relative">
					{formattedArticles}

					{!isLoading && !error && hasNextPage && (
						<div className="flex justify-center items-center pb-4">
							<LoadMoreButton
								onClickBtn={() => fetchNextPage()}
								isSmall={true}
								isLoading={isFetchingNextPage}>
								more articles
							</LoadMoreButton>
						</div>
					)}
				</div>
			</div>
			<div className=" w-full h-full bg-black absolute top-0 left-0 translate-x-[3px] translate-y-[3px]"></div>
		</div>
	);
};

export default ArticlesBox;
