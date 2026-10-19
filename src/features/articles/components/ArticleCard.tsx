import { useState } from "react";
import { useNavigate } from "react-router";
import CategoryLabel from "@/features/categories/components/CategoryLabel";
import TimeLabel from "@/components/TimeLabel";

import { Article } from "@/types/article";

function stripHTML(html: string) {
	const div = document.createElement('div');
	div.innerHTML = html;
	return div.textContent || '';
}

type ArticleCardProps = {
	article: Article;
	layout?: "grid" | "single";
}

type ArticleImageProps = {
	article: Article;
	isSingle: boolean
}

const ArticleImage = ({ article, isSingle }: ArticleImageProps) => {
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [isImageError, setIsImageError] = useState(false);

	if (!article.image) {
		return (
			<div className={` border-0 border-black dark:border-[#fff] overflow-hidden  rounded-sm relative w-full ${isSingle
				? "aspect-video md:w-[40%]"
				: "aspect-video"
				}`}>
				<div className=" absolute inset-0 flex items-center justify-center bg-[#eae8e0] dark:bg-[#151515]">
					<span className=" text-gray-500 uppercase">No Image</span>
				</div>
			</div>
		)
	}

	return (
		<div className={` border-0 border-black dark:border-[#fff] overflow-hidden  rounded-sm relative w-full ${isSingle
			? "aspect-video md:w-[40%]"
			: "aspect-video"
			}`}>

			{!isImageError && !isImageLoaded && (
				<div className=" absolute inset-0 flex items-center justify-center bg-[#eae8e0] dark:bg-[#151515] z-10">
					<span className=" text-gray-500 dark:text-[#aaa] uppercase">Loading...</span>
				</div>
			)}

			{isImageError && (
				<div className=" absolute inset-0 flex items-center justify-center bg-[#eae8e0] dark:bg-[#151515] z-10">
					<span className=" text-gray-500 dark:text-[#aaa] uppercase">Image unavailable</span>
				</div>
			)}

			<img
				onLoad={() => setIsImageLoaded(true)}
				onError={() => {
					setIsImageLoaded(false)
					setIsImageError(true);
				}}
				src={article.image?.url}
				className=" w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
				alt={article.image?.url}
			/>
		</div>
	)
}


const ArticleCard = ({ article, layout = "grid" }: ArticleCardProps) => {
	const navigate = useNavigate();
	const isSingle = layout === "single";
	const stripedHtml = stripHTML(article.content.html);

	return (
		<div
			onClick={() => {
				navigate(`/articles/${article.slug}`);
			}}
			className=" relative group cursor-pointer h-full article-card"
		>
			<div className={` bg-[transparent] h-full relative z-10 group-hover:translate-x-[4px] group-hover:translate-y-[4px] transition-all content-start p-2 rounded-lg border border-black/20 dark:border-white/20 gap-2.5 ${isSingle
				? "flex flex-col md:flex-row"
				: "grid grid-cols-1 md:flex-nowrap flex-wrap"
				}`}>

				<ArticleImage article={article} isSingle={isSingle} />

				<div className=" flex gap-2 absolute top-3 left-3 ">
					{article.categories.map((category) => (
						<CategoryLabel
							key={category.id}
							category={category}
						/>
					))}
				</div>

				<div className={` bg-red-0 flex flex-col gap-2 p-3  w-full md:flex-shrink flex-shrink-0 ${isSingle ? "md:w-[60%]" : ""
					}`}>
					<div className="flex flex-wrap justify-between items-center gap-2">
						<TimeLabel time={article.createdAt} />
					</div>


					<h3 className=" text-3xl font-extrabold leading-none mb-2 group-hover:underline">
						{article.title}
					</h3>
					<p className=" leading-[1.25] text-zinc-800 dark:text-zinc-300 text-[1rem]">
						{stripedHtml.length > 80
							? stripedHtml.slice(0, 80) + "..."
							: stripedHtml}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ArticleCard