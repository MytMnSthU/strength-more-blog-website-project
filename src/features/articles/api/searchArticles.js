import { API_ENDPOINT } from "@/config/env";
import { SEARCH_ARTICLE } from "../queries/articleQueries";
import request from "graphql-request";

export async function searchArticles(searchTerm) {
	try {
		if (!searchTerm.trim()) return { articles: [] };
		return await request(API_ENDPOINT, SEARCH_ARTICLE, {
			_search: searchTerm,
		});
	} catch (error) {
		console.error("Error searching articles", error);
		throw error;

	}
}
