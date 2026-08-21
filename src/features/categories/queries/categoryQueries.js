import { gql } from "graphql-request";

export const GET_CATEGORIES = gql`
	query GetCategories {
		categories(orderBy: name_ASC) {
			id
			name
			image {
				url(
					transformation: {
						image: { resize: { width: 320 } }
						document: { output: { format: webp } }
					}
				)
			}
			slug
			color {
				hex
			}
		}
	}
`;
