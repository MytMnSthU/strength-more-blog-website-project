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
			likes
			shares
			views
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
			likes
			shares
			views
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

export const SEARCH_ARTICLES = gql`
	query SearchArticles($_search: String = "") {
		articles(where: { _search: $_search }) {
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
			likes
			shares
			views
		}
	}
`;

export const TOGGLE_LIKE_MUTATION = gql`
    # 1. The input variable is now a non-nullable String named $slug.
    mutation ToggleLikeMutation($slug: String!, $likes: Int!) {
        upsertArticle(
            # 2. The 'where' clause now finds the article by its slug.
            where: { slug: $slug }
            upsert: {
                # 3. If a new draft must be created, we provide the slug for it.
                create: { slug: $slug, likes: $likes }
                update: { likes: $likes }
            }
        ) {
            id # You can still get the system ID back in the response.
            slug
        }

        # 4. The publish operation also finds the article by its slug.
        publishArticle(where: { slug: $slug }, to: PUBLISHED) {
            id
        }
    }
`;

export const TEST = gql`
	mutation UpdateLikesOnly {
		updateArticle(where: { id: "clkmm5eds08xw0c2tugjoama5" }, data: { likes: 100 }) {
			id
			likes
			stage
		}
	}
`;
