const pulse = "animate-pulse bg-black/20 dark:bg-white/20";

const ArticleBoxCardSkeleton = () => {
	return (
		<div className=" border-b border-black/20 dark:border-white/20">
			<div className=" px-4 py-4 grid gap-3">
				<div className=" flex flex-col gap-2">
					<span className={` w-3/4 h-6 rounded ${pulse}`} />
					<span className={` w-1/2 h-6 rounded ${pulse}`} />
				</div>
				<div className="flex flex-wrap justify-between items-center gap-2">
					<span className={` w-20 h-4 rounded ${pulse}`} />
					<div className=" flex gap-2">
						<span className={` w-12 h-4 rounded ${pulse}`} />
						<span className={` w-12 h-4 rounded ${pulse}`} />
					</div>
				</div>
				<div className=" flex gap-2">
					<span className={` w-16 h-6 rounded ${pulse}`} />
					<span className={` w-14 h-6 rounded ${pulse}`} />
				</div>
			</div>
		</div>
	);
};

export default ArticleBoxCardSkeleton;