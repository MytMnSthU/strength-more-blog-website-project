import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/categoriesApi";

const useCategories = () => {
	return useQuery({
		queryKey: ["categories"],
		queryFn: () => fetchCategories,
		refetchOnWindowFocus: false,
	});
};

export default useCategories;
