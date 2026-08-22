import { useQuery } from "@tanstack/react-query";
import { getArticle } from "../api/getArticle";

const useArticle = (articleId) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["article", articleId],
		queryFn: () => {
			return getArticle(articleId);
		},
	});

	return {
		data,
		isLoading,
		error,
	};
};

export default useArticle