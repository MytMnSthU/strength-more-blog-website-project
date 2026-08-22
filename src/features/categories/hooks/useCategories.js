import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/categoriesApi";

const useCategories = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["categories"],
		queryFn: () => {
			return fetchCategories();
		},
		refetchOnWindowFocus: false,
	});

	return {
		data,
		isLoading,
		error,
	};
};

export default useCategories;
