import { gql } from "@apollo/client";
// import { ObjectId } from 'mongoose'

// get all books
export const getBooksQuery = gql`
	{
		books {
			name
			id
			author {
				name
			}
		}
	}
`;

// get all authors
export const getAuthorsQuery = gql`
	{
		authors {
			name
			id
		}
	}
`;

// add new book
export const addBookMutation = gql`
	mutation ($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			name
			id
		}
	}
`;

export const getBookQuery = gql`
	query ($id: ID) {
		book(id: $id) {
			id
			name
			genre
			author {
				id
				name
				age
				books {
					name
					id
				}
			}
		}
	}
`;
