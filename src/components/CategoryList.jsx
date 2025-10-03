import { useQuery } from "@tanstack/react-query";
import CategoryCard from "./CategoryCard";
import { fetchData } from "../utils/utils";
import { GET_CATEGORIES } from "../graphql/query";
import Loader from "./Loader";
import { useRef, useEffect } from "react";
import { stagger, animate, createScope } from "animejs";

const CategoryList = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ["categories"],
		queryFn: () => fetchData({ query: GET_CATEGORIES }),
		refetchOnWindowFocus: false,
	});

	const categoryListRoot = useRef(null);
	const scope = useRef(null);

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

	useEffect(() => {
		if(!categoryListRoot?.current?.children?.length) return;

		const categoryCards = Array.from(categoryListRoot.current.children)

		scope.current = createScope({ root: categoryListRoot.current }).add(() => {
			animate(categoryCards, {
				translateY: [100, 0],
				translateX: [100, 0],
				scale: [0.8, 1],
				filter: ['blur(30px)', 'blur(0px)'],
				opacity: [0, 1],
				ease: 'out(2.4)',
				duration: 400,
				delay: stagger(80, { start: 50, from: 'first' }),
			});
		});
		return () => scope.current.revert();
	}, [data]);
	
    return (
        <div>
            <h3 className=" text-2xl font-extrabold mb-4">Categories</h3>
            <div ref={categoryListRoot} className="grid sm:grid-cols-2 gap-5">
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};

export default CategoryList

