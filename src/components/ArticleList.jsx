import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import ArticleCard from "./ArticleCard";
import LoadMoreButton from "./LoadMoreButton";
import Loader from "./Loader";
import { formatArticles } from "../utils/utils";

const ArticleList = ({ title, fetchData }) => {
	const fetchMoreArticles =  ({ pageParam = 0 }) => {
		return  fetchData({ skip: pageParam });
	};

	const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading, refetch, error } = useInfiniteQuery({
		queryKey: ["articles"],
		queryFn: fetchMoreArticles,
		getNextPageParam: (lastPage, allPages) => {
			const allItems = allPages.flatMap((p) => p.articles); // or your data path
			const totalLoaded = allItems.length;
			const pageSize = 8; // match your `count`
			const hasMore = lastPage.articles.length === pageSize;

			return hasMore ? totalLoaded : undefined;
		},
		refetchOnWindowFocus: false,
	});

	console.log({ isLoading, isFetching, isFetchingNextPage, data });

	if (error) {
		console.error("Error fetching articles:", error);
		return <div>Error loading articles</div>;
	}

	if (isLoading) return <Loader />;

	if (data?.pages?.length) {
		const formattedArticles = formatArticles(data.pages.flatMap((page) => page.articles));

		return (
			<>
				<div className="grid gap-2.5">
					<h3 className=" text-2xl font-extrabold">{title}</h3>
					<div className=" grid sm:grid-cols-2 gap-5">
						{formattedArticles.map((article) => (
							<ArticleCard
								key={article.id}
								article={article}
							/>
						))}
					</div>
					{title.toLowerCase() === "recent articles" && hasNextPage && (
						<div className="flex justify-center items-center">
							<LoadMoreButton
								onClickBtn={() => fetchNextPage()}
								isLoading={isFetchingNextPage}>
								more articles
							</LoadMoreButton>
						</div>
					)}
				</div>
			</>
		);
	}
};

export default ArticleList;
