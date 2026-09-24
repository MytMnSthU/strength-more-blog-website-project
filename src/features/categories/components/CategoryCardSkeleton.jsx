const pulse = "animate-pulse bg-black/20 dark:bg-white/20";

const CategoryCardSkeleton = () => {
	return (
		<div className=" relative group h-[140px] cursor-pointer">
			<div className=" h-full p-2.5">
				<div className=" h-full relative overflow-hidden rounded-lg">
					<div className={` w-full h-full rounded-lg ${pulse}`} />
					<span className={` absolute bottom-3 left-3 w-32 h-8 rounded ${pulse}`} />
				</div>
			</div>
		</div>
	);
};

export default CategoryCardSkeleton;