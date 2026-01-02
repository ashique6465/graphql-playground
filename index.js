const { ApolloServer, gql} = require('apollo-server');

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

input CreateUserInput{
name: String!
email: String!
age: Int!
}

type Mutation {
createUser(input: CreateUserInput!): User!
}

`

const users = [];

const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation :{
    createUser: (_, {input}) =>{
      const newUser = {
        id: users.length + 1 ,
        name: input.name,
        email: input.email,
        age:input.age
      };
      users.push(newUser);
      return newUser;

    }
  }


}

const server = new ApolloServer({
  typeDefs,
  resolvers
})
server.listen().then(({url}) =>{
  console.log(`Server is running at ${url}`)
})