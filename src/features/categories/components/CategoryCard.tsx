import { useNavigate } from "react-router";
import { Category } from "@/types/category";
import { useImageStatus } from "@/hooks/hooks";

type CategoryCardProps = {
	category: Category
}

const CategoryImage = ({ category }: CategoryCardProps) => {
	const { isImageError, isImageLoaded, handleError, handleLoad } = useImageStatus();

	if (!category.image) {
		return (
			<div className=" absolute inset-0 flex items-center justify-center bg-[#e2e1d8] dark:bg-[#111] z-40">
				<span className=" text-gray-500 dark:text-[#aaa] uppercase">No image</span>
			</div>
		)
	}

	return (
		<div className=" h-full relative  overflow-hidden rounded-lg">
			{!isImageLoaded && (
				<div className=" absolute inset-0 flex items-center justify-center bg-[#e2e1d8] dark:bg-[#111] z-40">
					<span className=" text-gray-500 dark:text-[#aaa] uppercase">Loading...</span>
				</div>
			)}
			{isImageError && (
				<div className=" absolute inset-0 flex items-center justify-center bg-[#e2e1d8] dark:bg-[#111] z-40">
					<span className=" text-gray-500 dark:text-[#aaa] uppercase">Image unavailable</span>
				</div>
			)}
			<img
				src={category.image.url}
				className=" w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
				alt={category.image.url}
				onLoad={handleLoad}
				onError={handleError}
			/>
			<div className=" w-full h-full bg-black opacity-40 absolute z-20 top-0 left-0"></div>
			<span className=" uppercase text-white text-4xl absolute bottom-3 left-3 z-30 title">
				{category.name}
			</span>
		</div>
	)
}

const CategoryCard = ({ category }: CategoryCardProps) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => {
				navigate(`/categories/${category.slug}`);
			}}
			className=" relative group  h-[140px] cursor-pointer"
		>
			<div className=" h-full bg-[#F3F1E8] dark:bg-[#1F1F1F] p-2.5 border-0 border-black dark:border-[#fff] group-hover:translate-x-[3px] group-hover:translate-y-[3px] transition-all relative z-10">
				<CategoryImage category={category} />
			</div>
		</div>
	);
};

export default CategoryCard