import request from "graphql-request";
import { GET_ARTICLE, GET_ARTICLES } from "../queries/articleQueries";
import { API_ENDPOINT } from "../../../config/env";

export async function fetchArticles({ limit = 8, pageParam = 0, where = {} }) {
	try {
		const data = await request(API_ENDPOINT, GET_ARTICLES, {
			limit,
			skip: pageParam,
			where,
		});

		return data;
	} catch (error) {
		console.error("Error fetching articles:", error);
		throw error;
	}
}

export async function fetchArticle(id) {
	try {
		const data = await request(API_ENDPOINT, GET_ARTICLE, {
			articleId: id,
		});
		return data;
	} catch (error) {
		onsole.error("Error fetching article:", error);
		throw error;
	}
}
