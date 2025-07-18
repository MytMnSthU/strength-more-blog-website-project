import request from "graphql-request";
import { GET_ARTICLES } from "../graphql/query";

export const formatDate = (date) => {
	const newDate = new Date(date);

	const month = newDate.toLocaleDateString("en-US", { month: "short" });

	const day = newDate.getDate();

	const year = newDate.getFullYear();

	const formattedDate = `${month} ${day}, ${year}`;

	return formattedDate;
};

export const formatArticles = (articles) => {
	return articles.map((article) => {
		const newArticle = {
			...article,
			createdAt: formatDate(article.createdAt),
		};

		return newArticle;
	});
};

export const fetchData = async ({ query = GET_ARTICLES, limit = 8, pageParam = 0, where = {} } = {}) => {
	try {
		const endpoint = import.meta.env.VITE_API_KEY;

		const data = await request(endpoint, query, {
			limit,
			skip: pageParam,
			where,
		});

		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error; // Re-throw the error to be handled by the calling function
	}
};
