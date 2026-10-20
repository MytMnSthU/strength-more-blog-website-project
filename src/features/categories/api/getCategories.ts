import request from "graphql-request";
import { GET_CATEGORIES } from "../queries/categoryQueries";
import { API_ENDPOINT } from "@/config/env";
import { Category } from "@/types/category";

type GetCategoriesResponse = {
	categories: Category[]
}

export async function getCategories() : Promise<GetCategoriesResponse> {
	try {
		const data = await request<GetCategoriesResponse>(API_ENDPOINT, GET_CATEGORIES);
		return data;
	} catch (error) {
		console.error("Error fetching categories:", error);
		throw error;
	}
}
