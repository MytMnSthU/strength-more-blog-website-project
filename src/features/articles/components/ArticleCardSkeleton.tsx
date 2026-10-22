const pulse = "animate-pulse bg-black/20 dark:bg-white/20";

const ArticleCardSkeleton = ({ layout = "grid" }) => {
	const isSingle = layout === "single";

	return (
		<div className=" relative group cursor-pointer h-full article-card">
			<div className={` bg-[transparent] h-full relative z-10 content-start p-2 rounded-lg border border-black/20 dark:border-white/20 gap-2.5 ${
				isSingle
					? "flex flex-col md:flex-row"
					: "grid grid-cols-1 md:flex-nowrap flex-wrap"
			}`}>
				<div className={` overflow-hidden relative rounded-sm w-full ${
					isSingle
						? "aspect-video md:w-[40%]"
						: "aspect-video"
				}`}>
					<div className={` w-full h-full ${pulse}`} />

					<div className=" flex gap-2 absolute top-2 left-2">
						<span className={` w-16 h-6 rounded ${pulse}`} />
						<span className={` w-14 h-6 rounded ${pulse}`} />
					</div>
				</div>

				<div className={` flex flex-col gap-2 p-3 w-full md:flex-shrink flex-shrink-0 ${
					isSingle ? "md:w-[60%]" : ""
				}`}>
					<span className={` w-24 h-4 rounded ${pulse}`} />

					<span className={` w-3/4 h-8 rounded ${pulse}`} />
					<span className={` w-1/2 h-8 rounded ${pulse}`} />

					<span className={` w-full h-4 rounded ${pulse}`} />
					<span className={` w-2/3 h-4 rounded ${pulse}`} />
				</div>
			</div>
		</div>
	);
};

export default ArticleCardSkeleton;