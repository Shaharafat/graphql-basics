const graphql = require("graphql");
const _ = require("lodash");
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
} = graphql;

// dummy data
let books = [
	{ name: "Name of the wind", genre: "Fantasy", id: "1", authorId: "1" },
	{ name: "This final Empire", genre: "Fantasy", id: "2", authorId: "2" },
	{ name: "The long earth", genre: "Fantasy", id: "3", authorId: "3" },
	{ name: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "2" },
	{ name: "The Colour of Magic", genre: "Fantasy", id: "5", authorId: "3" },
	{ name: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "3" },
];

let authors = [
	{ name: "Patrick Rothfuss", age: 44, id: "1" },
	{ name: "Brandon Sanderson", age: 42, id: "2" },
	{ name: "Terry Pratchett", age: 66, id: "3" },
];

// defining object type
const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				// parent works in nested object to
				// get the parent object.
				return _.find(authors, { id: parent.authorId });
			},
		},
	}),
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			// ✅ list type
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return _.filter(books, { authorId: parent.id });
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		// find single book
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// 🎁 in this function we write code for the data we need
				return _.find(books, { id: args.id });
			},
		},
		// find author
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(authors, { id: args.id });
			},
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(person, args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(person, args) {
        return authors
      }
    }
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
