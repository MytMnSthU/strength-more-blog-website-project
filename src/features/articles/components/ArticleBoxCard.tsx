import { useNavigate } from "react-router";
import CategoryLabel from "@/features/categories/components/CategoryLabel";
import TimeLabel from "@/components/TimeLabel";
import { Article } from "@/types/article";

type ArticleBoxCardProps = {
	article: Article;
}

const ArticleBoxCard = ({ article }: ArticleBoxCardProps) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => {
                navigate(`/articles/${article.slug}`);
            }}
            className=" cursor-pointer hover:bg-[#e6e4db] dark:hover:bg-[#282727] border-b border-black/20 dark:border-white/20"
        >
            <div className=" px-4 py-4 grid gap-3">
                <h4 className=" text-xl font-bold leading-none mb-0">
                    {article.title}
                </h4>
                <div className="flex flex-wrap justify-between items-center gap-2">
					<TimeLabel time={article.createdAt} />
					
				</div>
				<div className=" flex gap-2">
                    {article.categories.map((category) => (
                        <CategoryLabel key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArticleBoxCard