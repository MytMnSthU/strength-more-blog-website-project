import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchArticles } from "../api/articlesApi";

const useArticles = ({ category, isPopular }) => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		error,
	} = useInfiniteQuery({
		queryKey: ["articles", category, isPopular],
		queryFn: ({ pageParam = 0 }) => {
			return fetchArticles({
				pageParam,
				where: {
					popularArticle: isPopular,
					categories_some: { slug: category },
				},
			});
		},
		getNextPageParam: (lastPage, allPages) => {
			const allItems = allPages.flatMap((p) => p.articles);
			const totalLoaded = allItems.length;
			const pageSize = 8; // match your `count`
			const hasMore = lastPage.articles.length === pageSize;

			return hasMore ? totalLoaded : undefined;
		},
		refetchOnWindowFocus: false,
	});

	return {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		error,
	};
};

export default useArticles;
