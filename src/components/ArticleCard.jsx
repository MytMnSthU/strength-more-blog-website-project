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
            <div className=" bg-white h-full  grid gap-2.5 border-2 border-black rounded-[30px] p-2.5 pb-5 relative z-10 group-hover:translate-x-[3px] group-hover:translate-y-[3px] transition-all">
                <div className=" h-[250px] border border-black rounded-[20px] overflow-hidden relative ">
                    <img
                        src={article.image.url}
                        className=" w-full h-full object-cover"
                        alt={article.image.url}
                    />

                    <div className=" flex absolute top-2 left-2 ">
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
				<p className=" leading-none text-zinc-800">
					{stripHTML(article.content.html).length > 100
						? stripHTML(article.content.html).slice(0, 100) + "..."	
						: stripHTML(article.content.html)}
				</p>
            </div>
            <div className=" w-full h-full bg-black rounded-[30px] absolute top-0 left-0 translate-x-[3px] translate-y-[3px] z-0"></div>
        </div>
    );
};

export default ArticleCard