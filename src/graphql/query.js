import { gql } from "graphql-request";

export const GET_ARTICLES = gql`
	query GetArticles($limit: Int = 8, $skip: Int = 4, $where: ArticleWhereInput = {}) {
		articles(where: $where, orderBy: publishedAt_DESC, first: $limit, skip: $skip) {
			id
			title
			slug
			image {
				url
			}
			createdAt
			categories {
				id
				color {
					hex
				}
				name
				slug
			}
			content {
				html
			}
			popularArticle
		}
	}
`;

export const GET_POPULAR_ARTICLES = gql`
	query GetPopularArticles($limit: Int = 4, $skip: Int = 4) {
		articles(where: { popularArticle: true }, orderBy: publishedAt_DESC, first: $limit, skip: $skip) {
			id
			title
			slug
			image {
				url
			}
			createdAt
			categories {
				id
				color {
					hex
				}
				name
				slug
			}
			content {
				html
			}
			popularArticle
		}
	}
`;

export const GET_ARTICLE = gql`
	query GetArticle($articleId: String!) {
		article(where: { slug: $articleId }) {
			id
			title
			slug
			image {
				url
			}
			createdAt
			categories {
				id
				color {
					hex
				}
				name
				slug
			}
			content {
				html
			}
			popularArticle
			comments {
				email
				title
				username
				id
				createdAt
			}
		}
	}
`;

export const GET_CATEGORIES = gql`
	query GetCategories {
		categories(orderBy: name_ASC) {
			id
			name
			image {
				url
			}
			slug
			color {
				hex
			}
		}
	}
`;
