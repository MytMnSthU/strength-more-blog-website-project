import { useQuery } from "@tanstack/react-query";
import CategoryCard from "./CategoryCard";
import { fetchData } from "../utils/utils";
import { GET_CATEGORIES } from "../graphql/query";
import Loader from "./Loader";

const CategoryList = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ["categories"],
		queryFn: () => fetchData({ query: GET_CATEGORIES }),
		refetchOnWindowFocus: false,
	});

	if (error) {
		console.error("Error fetching categories:", error);
		return <div>Error loading categories</div>;
	}

	if (isLoading) return (
		<div>
            <h3 className=" text-2xl font-extrabold mb-4">Categories</h3>
			<div className="w-full h-[200px] relative"><Loader /></div>
		</div>
	);

	const categories = data?.categories || [];

	if (!categories.length) {
		return <div>No categories found</div>;
	}
	
    return (
        <div>
            <h3 className=" text-2xl font-extrabold mb-4">Categories</h3>
            <div className="grid sm:grid-cols-2 gap-5">
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};

export default CategoryList

