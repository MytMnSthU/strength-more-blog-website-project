const pulse = "animate-pulse bg-black/20 dark:bg-white/20";

const CategoryLabelSkeleton = () => {
	return (
		<div>
			<span className={` block w-16 h-5 rounded ${pulse}`} />
		</div>
	);
};

export default CategoryLabelSkeleton;