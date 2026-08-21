import { useQuery } from "@tanstack/react-query";
import { fetchArticle } from "../api/articlesApi";

const useArticle = (articleId) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["article", articleId],
		queryFn: () => {
			return fetchArticle(articleId);
		},
	});

	return {
		data,
		isLoading,
		error,
	};
};

export default useArticle