import CategoryLabel from "./CategoryLabel";
import CategoryLabelSkeleton from "./CategoryLabelSkeleton";
import useCategories from "../hooks/useCategories";

const CategoryLabelList = () => {
	const { data, error, isLoading } = useCategories();

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
		<div className=" flex flex-wrap gap-2 p-4">
			{Array.from({ length: 6 }).map((_, index) => (
				<CategoryLabelSkeleton key={index} />
			))}
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
