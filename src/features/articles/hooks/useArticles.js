import { useInfiniteQuery } from "@tanstack/react-query";
import { getArticles } from "../api/getArticles";

const useArticles = ({ category, isPopular, pageSize = 8, limit = 8 }) => {
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
			return getArticles({
				limit,
				pageParam,
				where: {
					categories_some: { slug: category },
					...(isPopular && {
						popularArticle: true,
					}),
				},
			});
		},
		getNextPageParam: (lastPage, allPages) => {
			const allItems = allPages.flatMap((p) => p.articles);
			const totalLoaded = allItems.length;
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
