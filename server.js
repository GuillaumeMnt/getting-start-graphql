const express = require("express");
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");

// DB ... 🙊🙈
const friends = [
  {
    id: 1,
    name: "Guillaume",
    gender: "M",
    age: 23,
  },
  {
    id: 2,
    name: "Lucas",
    gender: "M",
    age: 21,
  },
  {
    id: 3,
    name: "JM",
    gender: "F",
    age: 23,
  },
  {
    id: 4,
    name: "Yann",
    gender: "nd",
    age: 29,
  },
];

// GraphQL Schema
const schema = buildSchema(`
    type Query {
        helloYou(name: String!): String
        giveGender(gender: String!): [User]
        legalAge: [User]
    }

    type User {
        id: Int
        name: String
        gender: String
        age: Int
    }
`);

const helloName = ({ name }) => {
  return `Hello ${name}!`;
};

const isLegalAge = ({}) => {
  return friends.filter((user) => {
    return user.age >= 18;
  });
};

const giveGender = ({ gender }) => {
  return friends.filter((user) => {
    return user.gender === gender;
  });
};

const root = {
  helloYou: helloName,
  legalAge: isLegalAge,
  giveGender: giveGender,
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
