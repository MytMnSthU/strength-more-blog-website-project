import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import TimeLabel from "./TimeLabel";
import CommentBox from "./CommentBox";
import CommentForm from "./CommentForm";
import CategoryLabel from "./CategoryLabel";
import BreadCrumb from "./BreadCrumb";
import { gql, request } from "graphql-request";
import Loader from "./Loader";

const ArticleDetail = ({ fetchAndSetArticles }) => {
	const contentRef = useRef(null);
	const { articleId } = useParams();
	const [article, setArticle] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const getArticleQuery = gql`
		query GetArticle {
			article(where: { slug: "${articleId}" }) {
				id
                title
                slug
                image {
                    url
                }
                createdAt
                categories {
                    id
                    color {
                        hex
                    }
                    name
                    slug
                }
                content {
                    html
                }
                popularArticle
                comments {
                    email
                    title
                    username
                    id
                    createdAt
                }
			}
		}
	`;

	const fetchArticle = async () => {
		setIsLoading(true);
		try {
			const endpoint = import.meta.env.VITE_API_KEY;
			const data = await request(endpoint, getArticleQuery);
			const formattedArticle = {
				...data.article,
				createdAt: new Date(data.article.createdAt).toLocaleDateString(),
				comments: data.article.comments.map((comment) => ({
					...comment,
					createdAt: new Date(comment.createdAt).toLocaleDateString(),
				})),
			};
			setArticle(formattedArticle);
			setIsLoading(false);
		} catch (error) {
			console.error("Error fetching article:", error);
			setIsLoading(true);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchArticle();
	}, [articleId]);

	useEffect(() => {
		if (article) {
			contentRef.current.innerHTML = article.content.html;
		}
	}, [contentRef, articleId, article]);

	const breadCrumbItems = [{ label: "Home", to: "/" }, { label: article?.title }];

	return isLoading ? (
		<div className=" max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
			<Loader />
		</div>
	) : (
		article && (
			<div className=" grid gap-2.5 ">
				<BreadCrumb items={breadCrumbItems} />

				<h1 className=" text-3xl md:text-4xl font-extrabold leading-none mt-5">{article.title}</h1>
				<TimeLabel time={article.createdAt} />

				<div className="w-full h-[200px] sm:h-[400px] border-2 border-black overflow-hidden relative mt-2.5">
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

				<div ref={contentRef}></div>

				<h4 className=" text-2xl font-extrabold">Comments</h4>

				<div className=" grid gap-5 mb-10   ">
					{article.comments.length === 0 ? (
						<div>
							<span className=" text-lg">No comment.</span>
						</div>
					) : (
						article.comments.map((comment) => (
							<CommentBox
								key={comment.id}
								comment={comment}
							/>
						))
					)}
				</div>

				<div>
					<h4 className=" text-2xl font-extrabold mb-4">Leave Comment</h4>
					<CommentForm
						articleId={article.id}
						fetchAndSetArticles={fetchAndSetArticles}
					/>
				</div>
			</div>
		)
	);
};

export default ArticleDetail;
