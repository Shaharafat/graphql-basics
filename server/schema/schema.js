const graphql = require("graphql");
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLInt,
	GraphQLID,
} = graphql;
const _ = require("lodash");

// dummy data
let books = [
	{ name: "Name of the wind", genre: "Fantasy", id: "1" },
	{ name: "This final Empire", genre: "Fantasy", id: "2" },
	{ name: "The long earth", genre: "Fantasy", id: "3" },
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
	}),
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
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
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
