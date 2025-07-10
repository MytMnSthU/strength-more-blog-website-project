import { useNavigate } from "react-router";
import ArticleBoxCard from "./ArticleBoxCard";



const ArticlesBox = ({ boxTitle, articles }) => {
    const navigate = useNavigate();
    return (
        <div className=" relative">
            <div className=" bg-[#F3F1E8] border-2 border-black relative z-10">
                <span
                    onClick={() => {
                        navigate("/articles/popular");
                    }}
                    className=" text-xl font-semibold uppercase block p-4"
                >
                    {boxTitle}
                </span>

                <div className="overflow-y-auto h-[320px]">
                    {articles.map((article) => (
                        <ArticleBoxCard key={article.id} article={article} />
                    ))}
                </div>
            </div>
            <div className=" w-full h-full bg-black absolute top-0 left-0 translate-x-[3px] translate-y-[3px]"></div>
        </div>
    );
};

export default ArticlesBox