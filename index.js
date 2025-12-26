const { ApolloServer, gql } = require("apollo-server");


const typeDefs = gql `
   type User { 
   id: ID!
   name: String!
   email: String!
   age: Int!
   }
  type Query {
  users: [User!]!
  }

  type Mutation { 
  createUser(name: String!, email: String!, age: Int!): User!
  }
   `
   ;

const users = [];
const resolvers = {
    Query: {
        users: () => users,
    },
    Mutation: {
        createUser: (_, { name,email,age}) => {
            const user = {id: users.length + 1 , name,email,age};
            users.push(user)
            return user;
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
});
