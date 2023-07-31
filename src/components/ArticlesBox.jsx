import { useNavigate } from "react-router";
import ArticleBoxCard from "./ArticleBoxCard";



const ArticlesBox = ({ boxTitle, articles }) => {
    const navigate = useNavigate();
    return (
        <div className=" relative">
            <div className=" bg-white border-2 border-black rounded-[20px] relative z-10">
                <span
                    onClick={() => {
                        navigate("/articles/popular");
                    }}
                    className=" text-xl font-semibold uppercase block p-4"
                >
                    {boxTitle}
                </span>

                <div>
                    {articles.map((article) => (
                        <ArticleBoxCard key={article.id} article={article} />
                    ))}
                </div>
            </div>
            <div className=" w-full h-full bg-black rounded-[20px] absolute top-0 left-0 translate-x-[3px] translate-y-[3px]"></div>
        </div>
    );
};

export default ArticlesBox