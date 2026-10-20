import { useNavigate } from "react-router";

import { Category } from "@/types/category";

type CategoryLabelProps = {
	category: Category
}

const CategoryLabel = ({ category }: CategoryLabelProps) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={(e) => {
				navigate(`/categories/${category.slug}`);
				e.stopPropagation();
			}}
			className=" relative group cursor-pointer"
		>
			<div
				className=" px-5 py-2 border border-black/20 dark:border-white/20 dark:text-black relative z-10 hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all rounded-0"
				style={{ backgroundColor: category.color.hex }}
			>
				<span className=" text-sm uppercase font-semibold  block leading-none label">
					{category.name}
				</span>
			</div>
		</div>
	);
};

export default CategoryLabel