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

input UpdateUserInput{
name: String
age: Int
}

type Mutation {
createUser(input: CreateUserInput!): User!
updateUser(id: ID!, input: UpdateUserInput!): User!
deleteUser(id: ID!): User!
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

    },
    updateUser: (_, {id, input}) =>{
      const user = users.find(u => u.id == id);
      if(!user){
        throw new Error("User not found");
      }
      if(input.name !== undefined){
        user.name = input.name;
      }
      if(input.age !== undefined){
        user.age = input.age;
      }
      return user;
    },
    deleteUser: (_,{id}) => {
      const index = users.findIndex(u => u.id == id);
      if (index === -1){
        throw new Error("User not found");
      }
      const deletedUser = users[index];
      users.splice(index,1);
      return deletedUser

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