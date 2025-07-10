import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import TimeLabel from "./TimeLabel";
import CommentBox from "./CommentBox";
import CommentForm from "./CommentForm";
import CategoryLabel from "./CategoryLabel";
import BreadCrumb from "./BreadCrumb";




const ArticleDetail = ({ articles, fetchAndSetArticles }) => {
    const contentRef = useRef(null);
    const { articleId } = useParams();
    // const [Comments, setComments] = useState([]);

    const currentArticle = articles.filter(
        (article) => article.slug === articleId
    )[0];

    useEffect(() => {
        contentRef.current.innerHTML = currentArticle.content.html;
    }, [contentRef, articleId]);

	const breadCrumbItems = [
		{ label: "Home", to: "/" },
		{ label: currentArticle.title },
	];

    return (
		<div className=" grid gap-2.5 ">
			<BreadCrumb items={breadCrumbItems} />

			<h1 className=" text-3xl md:text-4xl font-extrabold leading-none mt-5">
                {currentArticle.title}
            </h1>
            <TimeLabel time={currentArticle.createdAt} />


            <div className="w-full h-[200px] sm:h-[400px] border-2 border-black overflow-hidden relative mt-2.5">
                <img
                    src={currentArticle.image.url}
                    className=" w-full h-full object-cover"
                    alt={currentArticle.image.url}
                />

                <div className=" flex absolute top-2 left-2 ">
                    {currentArticle.categories.map((category) => (
                        <CategoryLabel key={category.id} category={category} />
                    ))}
                </div>
            </div>

            <div ref={contentRef}></div>

            <h4 className=" text-2xl font-extrabold">Comments</h4>

            <div className=" grid gap-5 mb-10   ">
                {currentArticle.comments.length === 0 ? (
                    <div>
                        <span className=" text-lg">No comment.</span>
                    </div>
                ) : (
                    currentArticle.comments.map((comment) => (
                        <CommentBox key={comment.id} comment={comment} />
                    ))
                )}
            </div>

            <div>
                <h4 className=" text-2xl font-extrabold mb-4">Leave Comment</h4>
                <CommentForm
                    articleId={currentArticle.id}
                    fetchAndSetArticles={fetchAndSetArticles}
                />
            </div>
        </div>
    );
};

export default ArticleDetail