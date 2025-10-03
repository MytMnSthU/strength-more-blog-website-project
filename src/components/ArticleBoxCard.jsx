import { useContext } from "react";
import { useNavigate } from "react-router";
import { ThemedAppContext } from "../context/ThemedAppContext";
import CategoryLabel from "./CategoryLabel";
import TimeLabel from "./TimeLabel";
import { FaHeart, FaShare, FaEye } from "react-icons/fa";
import { formatNumber } from "../utils/utils";


const ArticleBoxCard = ({ article }) => {
    const navigate = useNavigate();
	const { scrollToTop } = useContext(ThemedAppContext);

    return (
        <div
            onClick={() => {
                navigate(`/articles/${article.slug}`);
                scrollToTop();
            }}
            className=" cursor-pointer hover:bg-[#e3e3e3] dark:hover:bg-[#333]"
        >
            <div className=" p-4 grid gap-2.5">
                <div className=" flex gap-2">
                    {article.categories.map((category) => (
                        <CategoryLabel key={category.id} category={category} />
                    ))}
                </div>
                <h4 className=" text-2xl font-bold leading-none">
                    {article.title}
                </h4>
                <div className="flex flex-wrap justify-between items-center gap-2">
					<TimeLabel time={article.createdAt} />
					<div className=" flex">
						<div className=" flex justify-center items-center gap-2 py-1 px-2">
							<FaHeart className=" text-[10px]" />
							<span className=" text-[12px] font-bold">{formatNumber(article.likes) || 0}</span>
						</div>
						<div className=" flex justify-center items-center gap-2 py-1 px-2">
							<FaShare className=" text-[10px]" />
							<span className=" text-[12px] font-bold">{formatNumber(article.shares) || 0}</span>
						</div>
						<div className=" flex justify-center items-center gap-2 py-1 px-2">
							<FaEye className=" text-[10px]" />
							<span className=" text-[12px] font-bold">{formatNumber(article.views) || 0}</span>
						</div>
					</div>
				</div>
            </div>
            <hr className=" border-b-2 border-b-black" />
        </div>
    );
};

export default ArticleBoxCard