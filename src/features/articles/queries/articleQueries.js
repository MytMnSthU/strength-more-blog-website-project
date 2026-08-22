import { gql } from "graphql-request";

export const GET_ARTICLES = gql`
	query GetArticles(
		$limit: Int = 8
		$skip: Int = 4
		$where: ArticleWhereInput = {}
	) {
		articles(
			where: $where
			orderBy: publishedAt_DESC
			first: $limit
			skip: $skip
		) {
			id
			title
			slug
			image {
				url(
					transformation: {
						image: { resize: { width: 320 } }
						document: { output: { format: webp } }
					}
				)
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
			likes
			shares
			views
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
				url(
					transformation: {
						image: { resize: { width: 800 } }
						document: { output: { format: webp } }
					}
				)
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
			likes
			shares
			views
		}
	}
`;

export const SEARCH_ARTICLE = gql`
	query SearchArticle($_search: String = "") {
		articles(where: { _search: $_search }) {
			id
			title
			slug
			image {
				url(
					transformation: {
						image: { resize: { width: 320 } }
						document: { output: { format: webp } }
					}
				)
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
			likes
			shares
			views
		}
	}
`;
