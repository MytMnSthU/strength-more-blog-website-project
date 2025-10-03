import { useQuery } from "@tanstack/react-query";
import CategoryLabel from "./CategoryLabel";
import { GET_CATEGORIES } from "../graphql/query";
import { fetchData } from "../utils/utils";
import Loader from "./Loader";

const CategoryLabelList = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ["categories"],
		queryFn: () => fetchData({ query: GET_CATEGORIES }),
		refetchOnWindowFocus: false,
	});

	if (error) {
		console.error("Error fetching categories:", error);
		return (
			<div className="text-red-700 px-4 py-3 relative my-4" role="alert">
				<strong className="font-bold">Error:</strong>
				<span className="block sm:inline ml-2 text-lg">Failed to load categories.</span>
			</div>
		);
	}

	if (isLoading) return (
		<div className="w-full h-[200px] flex relative overflow-hidden justify-center items-center">
			<Loader />
		</div>
	);

	const categories = data?.categories || [];

	if (!categories.length) {
		return <div>No categories found</div>;
	}

    return (
        <div className=" flex flex-wrap gap-2 p-4">
            {categories.map((category) => (
                <CategoryLabel key={category.id} category={category} />
            ))}
        </div>
    );
};

export default CategoryLabelList;
