const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: Int
    name: String
    age: Int
    position: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(name: String, age: Int, position: String): User
    updateUser(id: Int, name: String, age: Int, position: String): User
    deleteUser(id: Int): String
  }
`;

let users = [
  {
    id: 1,
    name: "New",
    age: 22,
    position: "Student",
  },
  {
    id: 2,
    name: "Cristiano Ronaldo",
    age: 34,
    position: "FootBaller",
  },
  {
    id: 3,
    name: "Emma Stone",
    age: 35,
    position: "Actress",
  },
];

const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    createUser(parent, args) {
      const newUser = args;
      newUser.id = users.length + 1;
      users.push(newUser);
      return newUser;
    },
    updateUser(parent, args) {
      var foundIndex = users.findIndex((x) => x.id == args.id);
      users[foundIndex] = args;

      return args;
    },
    deleteUser(parent, args) {
      var foundIndex = users.findIndex((x) => x.id == args.id);
      if (foundIndex > -1) {
        users.splice(foundIndex, 1);
      }

      return "Delete Success";
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`server ready at port ${url}`);
});
