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

const ArticleCard = ({ article }) => {
    const navigate = useNavigate();
	const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <div
            onClick={() => {
                navigate(`/articles/${article.slug}`);
            }}
            className=" relative group cursor-pointer h-full article-card"
        >
            <div className=" bg-[transparent] h-full grid gap-2.5  relative z-10 group-hover:translate-x-[4px] group-hover:translate-y-[4px] transition-all content-start p-2 rounded-lg border border-black/20 dark:border-white/20">
                <div className=" aspect-video border-0 border-black dark:border-[#fff] overflow-hidden relative  rounded-lg">
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

				<div className=" p-3 pt-0">
					<div className="flex flex-wrap justify-between items-center gap-2">
						<TimeLabel time={article.createdAt} />
						<div className=" flex">
							<div className=" flex justify-center items-center gap-2 py-1 px-2">
								<FaShare className=" text-[10px]" />
								<span className=" text-[14px] font-bold">{formatNumber(article.shares) || 0}</span>
							</div>
							<div className=" flex justify-center items-center gap-2 py-1 px-2">
								<FaEye className=" text-[10px]" />
								<span className=" text-[14px] font-bold">{formatNumber(article.views) || 0}</span>
							</div>
						</div>
					</div>


					<h3 className=" text-2xl font-extrabold mb-3 leading-none">
						{article.title}
					</h3>
					<p className=" leading-[1.25] text-zinc-800 dark:text-zinc-300 text-[16px]">
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