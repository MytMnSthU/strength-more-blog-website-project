import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/getCategories";

const useCategories = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["categories"],
		queryFn: () => {
			return getCategories();
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
