import request from "graphql-request";
import { GET_CATEGORIES } from "../queries/categoryQueries";
import { API_ENDPOINT } from "@/config/env";

export async function getCategories() {
	try {
		const data = await request(API_ENDPOINT, GET_CATEGORIES);
		return data;
	} catch (error) {
		console.error("Error fetching categories:", error);
		throw error;
	}
}
