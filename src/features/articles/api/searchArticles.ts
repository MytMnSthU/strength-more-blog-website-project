import { API_ENDPOINT } from "@/config/env";
import { SEARCH_ARTICLE } from "../queries/articleQueries";
import request from "graphql-request";

import { Article } from "@/types/article";

type SearchArticlesResponse = {
	articles: Article[]
}

export async function searchArticles(searchTerm: string): Promise<SearchArticlesResponse> {
	try {
		if (!searchTerm.trim()) return { articles: [] };
		return await request<SearchArticlesResponse>(API_ENDPOINT, SEARCH_ARTICLE, {
			_search: searchTerm,
		});
	} catch (error) {
		console.error("Error searching articles", error);
		throw error;

	}
}
