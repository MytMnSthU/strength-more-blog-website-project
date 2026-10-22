import { Category } from "./category";

export interface Article {
	id: string;
	slug: string;
	image: {
		url: string
	} | null;
	categories: Category[];
	createdAt: string;
	title: string;
	content: {
		html: string
	}
}
