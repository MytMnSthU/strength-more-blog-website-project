import { API_ENDPOINT } from "@/config/env";
import { GET_ARTICLES } from "../queries/articleQueries";
import request from "graphql-request";

export async function getArticles({ limit = 8, pageParam = 0, where = {} }) {
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
