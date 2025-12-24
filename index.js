const { ApolloServer, gql } = require("apollo-server");


const typeDefs = gql `
   type User { 
   id: ID!
   name: String!
   email: String!
   }
  type Query {
  users: [User!]!
  }

  type Mutation { 
  createUser(name: String!, email: String!): User!
  }
   `
   ;

const users = [];
const resolvers = {
    Query: {
        users: () => users,
    },
    Mutation: {
        createUser: (_, { name,email}) => {
            const user = {id: users.length + 1 , name,email};
            users.push(user)
            return user;
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
});
