import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import TimeLabel from "./TimeLabel";
import CommentBox from "./CommentBox";
import CommentForm from "./CommentForm";
import CategoryLabel from "./CategoryLabel";
import BreadCrumb from "./BreadCrumb";
import { request } from "graphql-request";
import Loader from "./Loader";
import { useQuery } from "@tanstack/react-query";
import { GET_ARTICLE } from "../graphql/query";

const ArticleDetail = () => {
	const contentRef = useRef(null);
	const { articleId } = useParams();

	const { data, isLoading, error } = useQuery({
		queryKey: ["article", articleId],
		queryFn: async() => {
			return await request(
				import.meta.env.VITE_API_KEY,
				GET_ARTICLE,
				{ articleId: articleId }
			);
		},
	});


	useEffect(() => {
		if (data?.article) {
			contentRef.current.innerHTML = data.article.content.html;
		}
	}, [contentRef, articleId, data]);

	const breadCrumbItems = [{ label: "Home", to: "/" }, { label: data?.article?.title }];

	if (error) {
		console.error("Error fetching article:", error);
		return <div>Error loading article</div>;
	}

	if (isLoading) return <Loader />;

	if (!data?.article) {
		return <div>No article found</div>;
	}

	const formattedArticle = {
		...data.article,
		createdAt: new Date(data.article.createdAt).toLocaleDateString(),
		// comments: data.article.comments.map((comment) => ({
		// 	...comment,
		// 	createdAt: new Date(comment.createdAt).toLocaleDateString(),
		// })),
	};

	return (
		<div className=" grid gap-2.5 ">
			<BreadCrumb items={breadCrumbItems} />

				<h1 className=" text-3xl md:text-4xl font-extrabold leading-none mt-5">{formattedArticle.title}</h1>
				<TimeLabel time={formattedArticle.createdAt} />

				<div className="w-full h-[200px] sm:h-[400px] border-2 border-black overflow-hidden relative mt-2.5">
					<img
						src={formattedArticle.image.url}
						className=" w-full h-full object-cover"
						alt={formattedArticle.image.url}
					/>

					<div className=" flex gap-2 absolute top-2 left-2 ">
						{formattedArticle.categories.map((category) => (
							<CategoryLabel
								key={category.id}
								category={category}
							/>
						))}
					</div>
				</div>

				<div ref={contentRef}></div>

				{/* <h4 className=" text-2xl font-extrabold">Comments</h4> */}

				{/* <div className=" grid gap-5 mb-10   ">
					{formattedArticle.comments.length === 0 ? (
						<div>
							<span className=" text-lg">No comment.</span>
						</div>
					) : (
						formattedArticle.comments.map((comment) => (
							<CommentBox
								key={comment.id}
								comment={comment}
							/>
						))
					)}
				</div> */}

				{/* <div>
					<h4 className=" text-2xl font-extrabold mb-4">Leave Comment</h4>
					<CommentForm
						articleId={formattedArticle.id}
						fetchAndSetArticles={fetchAndSetArticles}
					/>
				</div> */}
		</div>
	)
};

export default ArticleDetail;
