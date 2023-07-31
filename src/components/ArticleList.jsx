import ArticleCard from "./ArticleCard";
import LoadMoreButton from "./LoadMoreButton";
import Loader from "./Loader";



const ArticleList = ({
    title,
    articles,
    moreBlog,
    isDisable,
    loading,
    btnLoading,
    setBtnLoading,
}) => {
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="grid gap-2.5">
                    <h3 className=" text-2xl font-extrabold">{title}</h3>
                    <div className=" grid sm:grid-cols-2 gap-5">
                        {articles.length > 0 &&
                            articles.map((article) => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                />
                            ))}
                    </div>
                    {title.toLowerCase() === "recent articles" && (
                        <div className="flex justify-center items-center">
                            <LoadMoreButton
                                onClickBtn={moreBlog}
                                isDisableBtn={isDisable}
                                btnLoading={btnLoading}
                                setBtnLoading={setBtnLoading}
                            >
                                more blog
                            </LoadMoreButton>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ArticleList