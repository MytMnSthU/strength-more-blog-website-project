import { useQuery } from "@tanstack/react-query";
import { searchArticles } from "../api/searchArticles";

const useArticleSearch = (searchTerm) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["searchArticles", searchTerm],
		queryFn: () => searchArticles(searchTerm),
		enabled: !!searchTerm.trim(),
		staleTime: 0,
	});

	return {
		data,
		isLoading,
		isError,
	};
};

export default useArticleSearch
