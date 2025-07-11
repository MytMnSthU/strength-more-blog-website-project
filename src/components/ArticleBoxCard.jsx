import { useContext } from "react";
import { useNavigate } from "react-router";
import { ScrollTopContext } from "./ScrollTopContext";
import CategoryLabel from "./CategoryLabel";
import TimeLabel from "./TimeLabel";



const ArticleBoxCard = ({ article }) => {
    const navigate = useNavigate();
    const scrollToTop = useContext(ScrollTopContext);

    return (
        <div
            onClick={() => {
                navigate(`/articles/${article.slug}`);
                scrollToTop();
            }}
            className=" cursor-pointer"
        >
            <hr className=" border-b-2 border-b-black" />
            <div className=" p-4 grid gap-2.5">
                <div className=" flex gap-2">
                    {article.categories.map((category) => (
                        <CategoryLabel key={category.id} category={category} />
                    ))}
                </div>
                <h4 className=" text-2xl font-bold leading-none">
                    {article.title}
                </h4>
                <TimeLabel time={article.createdAt} />
            </div>
        </div>
    );
};

export default ArticleBoxCard