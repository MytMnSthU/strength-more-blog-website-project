import { useContext } from "react";
import { useNavigate } from "react-router";
import CategoryLabel from "./CategoryLabel";
import TimeLabel from "./TimeLabel";

import { ScrollTopContext } from "./ScrollTopContext";

function stripHTML(html) {
	const div = document.createElement('div');
	div.innerHTML = html;
	return div.textContent || '';
}

const ArticleCard = ({ article }) => {
    const navigate = useNavigate();
    const scrollToTop = useContext(ScrollTopContext);
    return (
        <div
            onClick={() => {
                navigate(`/articles/${article.slug}`);
                scrollToTop();
            }}
            className=" relative group cursor-pointer"
        >
            <div className=" bg-[#F3F1E8] h-full  grid gap-2.5 border-2 border-black  p-2.5 pb-5 relative z-10 group-hover:translate-x-[4px] group-hover:translate-y-[4px] transition-all">
                <div className=" aspect-video border border-black overflow-hidden relative ">
                    <img
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
				<p className=" leading-none text-zinc-800 text-[16px]">
					{stripHTML(article.content.html).length > 100
						? stripHTML(article.content.html).slice(0, 100) + "..."	
						: stripHTML(article.content.html)}
				</p>
            </div>
            <div className=" w-full h-full bg-black  absolute top-0 left-0 translate-x-[4px] translate-y-[4px] z-0"></div>
        </div>
    );
};

export default ArticleCard