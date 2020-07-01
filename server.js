const express = require("express");
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");

// GraphQL Schema
const schema = buildSchema(`
    type Query {
        helloYou(name: String!): String
    }
`);

const helloName = ({ name }) => {
  return `Hello ${name}!`;
};

const root = {
  helloYou: helloName,
};

// Create an express server and GraphQL endpoint
const app = express();

app.use(
  "/graphql",
  express_graphql({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Express GraphQL server now running on localhost:4000/graphql");
});
