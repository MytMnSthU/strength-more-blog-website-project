import { useNavigate } from "react-router";
import ArticleBoxCard from "./ArticleBoxCard";
import ArticleBoxCardSkeleton from "./ArticleBoxCardSkeleton";
import { formatArticles } from "@/utils/utils";
import LoadMoreButton from "@/components/LoadMoreButton";
import useArticles from "../hooks/useArticles";

const ArticlesBox = ({ boxTitle }) => {
	const navigate = useNavigate();

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		error,
	} = useArticles({
		limit: 4,
		pageSize: 4,
	});

	const formattedArticles = (() => {
		if (error) {
			console.error("Error fetching articles:", error);
			return (
				<div
					className=" text-red-700 px-4 py-3 relative my-4"
					role="alert">
					<strong className="font-bold">Error:</strong>
					<span className="block sm:inline ml-2 text-lg">
						Failed to load articles.
					</span>
				</div>
			);
		}
		if (isLoading)
			return (
				<div className=" w-full h-[200px] relative overflow-hidden">
					{Array.from({ length: 4 }).map((_, index) => (
						<ArticleBoxCardSkeleton key={index} />
					))}
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
			<div className=" bg-[#F3F1E8] dark:bg-[#1F1F1F] border rounded-lg border-black/20 dark:border-[#fff]/20 relative z-10">
				<span
					onClick={() => {
						navigate("/articles/popular");
					}}
					className=" text-xl font-semibold uppercase block p-4  border-black/20 dark:border-[#fff]/20 cursor-pointer border-b title">
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
		</div>
	);
};

export default ArticlesBox;
