import CategoryCard from "./CategoryCard";

const CategoryList = ({ categories }) => {
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

