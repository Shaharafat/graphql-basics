const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

// ⚙️ this route will be use to interect with gql data
app.use(
	"/graphql",
	graphqlHTTP({
		schema,
	})
);

app.listen(4000, () => {
	console.log("lisenting to the port 4000.. ");
});
