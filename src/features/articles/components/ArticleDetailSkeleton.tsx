const pulse = "animate-pulse bg-black/20 dark:bg-white/20";

const ArticleDetailSkeleton = () => {
	return (
		<div className="flex sm:flex-row-reverse flex-col gap-5">
			<div className="grid gap-2.5 flex-1">
				<div className=" flex items-center gap-2">
					<span className={` w-24 h-6 rounded ${pulse}`} />
					<span className={` w-40 h-6 rounded ${pulse}`} />
				</div>

				<div className=" flex flex-col gap-2 mt-5">
					<span className={` w-4/5 h-10 md:h-12 rounded ${pulse}`} />
					<span className={` w-3/5 h-10 md:h-12 rounded ${pulse}`} />
				</div>

				<span className={` w-28 h-5 rounded ${pulse}`} />

				<div className=" w-full h-[200px] sm:h-[500px] relative mt-2.5 rounded-lg">
					<div className={` w-full h-full rounded-lg ${pulse}`} />
					<div className=" flex gap-2 absolute top-2 left-2">
						<span className={` w-16 h-7 rounded ${pulse}`} />
						<span className={` w-14 h-7 rounded ${pulse}`} />
					</div>
				</div>

				<div className=" flex flex-col gap-3 mt-4">
					<span className={` w-full h-4 rounded ${pulse}`} />
					<span className={` w-full h-4 rounded ${pulse}`} />
					<span className={` w-full h-4 rounded ${pulse}`} />
					<span className={` w-2/3 h-4 rounded ${pulse}`} />
				</div>
			</div>
		</div>
	);
};

export default ArticleDetailSkeleton;