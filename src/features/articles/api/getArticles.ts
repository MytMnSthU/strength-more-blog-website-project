import { API_ENDPOINT } from "@/config/env";
import { GET_ARTICLES } from "../queries/articleQueries";
import request from "graphql-request";
import { Article } from "@/types/article";

type GetArticlesResponse = {
	articles: Article[]
}

export async function getArticles({ limit = 8, pageParam = 0, where = {} }) : Promise<GetArticlesResponse> {
	try {
		const data = await request<GetArticlesResponse>(API_ENDPOINT, GET_ARTICLES, {
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
