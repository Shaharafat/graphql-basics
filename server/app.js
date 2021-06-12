const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

// connect mongoose
mongoose
	.connect(
		`mongodb+srv://gqlNetNinja:gqlNetNinja@culster1.v6g4n.mongodb.net/gqlNetNinja?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useFindAndModify: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log("DB connected. ✌️"))
	.catch((err) => console.log(`Error happened: ${err.message}`));

// ⚙️ this route will be use to interect with gql data
app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(4000, () => {
	console.log("lisenting to the port 4000.. ");
});
