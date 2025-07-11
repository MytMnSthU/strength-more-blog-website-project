import { useParams } from "react-router";
import ArticleList from "./ArticleList";
import { useEffect, useState } from "react";
import { gql, request } from "graphql-request";
import Loader from "./Loader";
import { formatDate } from "../utils/utils";

const FilterArticleList = ({}) => {
	const { categoryId } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [articles, setArticles] = useState([]);

	const fetchArticlesByCategory = async (categoryId) => {
		setIsLoading(true);
		const getCurrentCategoryArticles = gql`
			query GetArticles {
				articles(
					where: { categories_some: { slug: "${categoryId}" } }	
				) {
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
			}`;

		try {
			const endpoint = import.meta.env.VITE_API_KEY;
			const data = await request(endpoint, getCurrentCategoryArticles);
			const formattedArticles = data.articles.map((article) => {
				const newArticle = {
					...article,
					createdAt: formatDate(article.createdAt),
					comments: article.comments.map((comment) => {
						const newComment = {
							...comment,
							createdAt: formatDate(comment.createdAt),
						};
						return newComment;
					}),
				};

				return newArticle;
			});

			setArticles(formattedArticles);
			setIsLoading(false);

			return data.articles;
		} catch (error) {
			console.error("Error fetching articles by category:", error);
			return [];
		}
	};

	useEffect(() => {
		fetchArticlesByCategory(categoryId);
	}, [categoryId]);

	return isLoading ? (
		<div className="flex justify-center items-center h-screen">
			<Loader />
		</div>
	) : (
		<ArticleList
			title={`Category '${categoryId}'`}
			articles={articles}
		/>
	);
};

export default FilterArticleList;
