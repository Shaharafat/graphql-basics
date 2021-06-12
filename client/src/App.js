import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import "./App.css";
import AddBook from "./components/AddBook";
import Booklist from "./components/Booklist";

// apollo client setup
const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div id="main">
				<Booklist />
				<AddBook />
			</div>
		</ApolloProvider>
	);
}

export default App;
