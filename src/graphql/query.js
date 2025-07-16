import { gql } from "graphql-request";

export const GET_ARTICLES = gql`
	query GetArticles($limit: Int = 8, $skip: Int = 4) {
		articles(orderBy: publishedAt_DESC, first: $limit, skip: $skip) {
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