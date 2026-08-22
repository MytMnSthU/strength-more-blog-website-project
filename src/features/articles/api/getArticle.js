import request from "graphql-request";
import { GET_ARTICLE } from "../queries/articleQueries";
import { API_ENDPOINT } from "@/config/env";

export async function getArticle(id) {
	try {
		const data = await request(API_ENDPOINT, GET_ARTICLE, {
			articleId: id,
		});
		return data;
	} catch (error) {
		console.error("Error fetching article:", error);
		throw error;
	}
}
