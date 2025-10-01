import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import CategoryLabel from "./CategoryLabel";
import TimeLabel from "./TimeLabel";

import { ThemedAppContext } from "../context/ThemedAppContext";

function stripHTML(html) {
	const div = document.createElement('div');
	div.innerHTML = html;
	return div.textContent || '';
}

const ArticleCard = ({ article }) => {
    const navigate = useNavigate();
    const { scrollToTop } = useContext(ThemedAppContext);
	const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <div
            onClick={() => {
                navigate(`/articles/${article.slug}`);
                scrollToTop();
            }}
            className=" relative group cursor-pointer h-full"
        >
            <div className=" bg-[#F3F1E8] dark:bg-[#1F1F1F] h-full  grid gap-2.5 border-2 border-black dark:border-[#aaa]  p-2.5 pb-5 relative z-10 group-hover:translate-x-[4px] group-hover:translate-y-[4px] transition-all">
                <div className=" aspect-video border border-black dark:border-[#aaa] overflow-hidden relative ">
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
                        className=" w-full h-full object-cover"
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

                <TimeLabel time={article.createdAt} />

                <h3 className=" text-2xl font-extrabold leading-none">
                    {article.title}
                </h3>
				<p className=" leading-none text-zinc-800 dark:text-zinc-300 text-[16px]">
					{stripHTML(article.content.html).length > 100
						? stripHTML(article.content.html).slice(0, 100) + "..."	
						: stripHTML(article.content.html)}
				</p>
            </div>
            <div className=" w-full h-full bg-black dark:bg-[#aaa]  absolute top-0 left-0 translate-x-[4px] translate-y-[4px] z-0"></div>
        </div>
    );
};

export default ArticleCard