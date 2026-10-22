import { useQuery } from "@tanstack/react-query";
import { getArticle } from "../api/getArticle";

const useArticle = (articleId: string | undefined) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["article", articleId],
		queryFn: () => {
			return getArticle(articleId!);
		},
		enabled: !!articleId
	});

	return {
		data,
		isLoading,
		error,
	};
};

export default useArticle