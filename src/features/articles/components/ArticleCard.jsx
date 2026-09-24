import { useState } from "react";
import { useNavigate } from "react-router";
import CategoryLabel from "@/features/categories/components/CategoryLabel";
import TimeLabel from "@/components/TimeLabel";
import { FaShare, FaEye } from "react-icons/fa";
import { formatNumber } from "@/utils/utils";

function stripHTML(html) {
	const div = document.createElement('div');
	div.innerHTML = html;
	return div.textContent || '';
}

const ArticleCard = ({ article, layout = "grid" }) => {
    const navigate = useNavigate();
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const isSingle = layout === "single";

    return (
        <div
            onClick={() => {
                navigate(`/articles/${article.slug}`);
            }}
            className=" relative group cursor-pointer h-full article-card"
        >
            <div className={` bg-[transparent] h-full relative z-10 group-hover:translate-x-[4px] group-hover:translate-y-[4px] transition-all content-start p-2 rounded-lg border border-black/20 dark:border-white/20 gap-2.5 ${
				isSingle
					? "flex flex-col md:flex-row"
					: "grid grid-cols-1 md:flex-nowrap flex-wrap"
			}`}>
                <div className={` border-0 border-black dark:border-[#fff] overflow-hidden relative rounded-sm w-full ${
					isSingle
						? "aspect-video md:w-[40%]"
						: "aspect-video"
				}`}>
					{!isImageLoaded && (
						<div className=" absolute inset-0 flex items-center justify-center bg-[#F3F1E8] dark:bg-[#111]">
							<span className=" text-gray-500 dark:text-[#aaa] uppercase">Loading...</span>
						</div>
					)}

					{!article.image && isImageLoaded && (
						<div className=" absolute inset-0 flex items-center justify-center bg-[#F3F1E8] dark:bg-[#111]">
							<span className=" text-gray-500 uppercase">No Image Available</span>
						</div>
					)}

                    <img
						onLoad={() => setIsImageLoaded(true)}
                        src={article.image.url}
                        className=" w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        alt={article.image.url}
                    />

                    <div className=" flex gap-2 absolute top-2 left-2 ">
                        {article.categories.map((category) => (
                            <CategoryLabel
                                key={category.id}
                                category={category}
                            />
                        ))}
                    </div>
                </div>

				<div className={` bg-red-0 flex flex-col gap-2 p-3  w-full md:flex-shrink flex-shrink-0 ${
					isSingle ? "md:w-[60%]" : ""
				}`}>
					<div className="flex flex-wrap justify-between items-center gap-2">
						<TimeLabel time={article.createdAt} />
						{/* <div className=" flex">
							<div className=" flex justify-center items-center gap-2 py-1 px-2">
								<FaShare className=" text-[0.625rem]" />
								<span className=" text-[0.875rem] font-bold">{formatNumber(article.shares) || 0}</span>
							</div>
							<div className=" flex justify-center items-center gap-2 py-1 px-2">
								<FaEye className=" text-[0.625rem]" />
								<span className=" text-[0.875rem] font-bold">{formatNumber(article.views) || 0}</span>
							</div>
						</div> */}
					</div>


					<h3 className=" text-3xl font-extrabold leading-none mb-2 group-hover:underline">
						{article.title}
					</h3>
					<p className=" leading-[1.25] text-zinc-800 dark:text-zinc-300 text-[1rem]">
						{stripHTML(article.content.html).length > 80
							? stripHTML(article.content.html).slice(0, 80) + "..."	
							: stripHTML(article.content.html)}
					</p>
				</div>
            </div>
        </div>
    );
};

export default ArticleCard