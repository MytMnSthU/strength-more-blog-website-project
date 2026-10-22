import request from "graphql-request";
import { GET_ARTICLE } from "../queries/articleQueries";
import { API_ENDPOINT } from "@/config/env";
import { Article } from "@/types/article";

interface GetArticleResponse {
	article: Article
}

export async function getArticle(id: string): Promise<Article> {
	try {
		const data = await request<GetArticleResponse>(API_ENDPOINT, GET_ARTICLE, {
			articleId: id,
		});
		return data.article;
	} catch (error) {
		console.error("Error fetching article:", error);
		throw error;
	}
}
