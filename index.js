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
  updateUser(id:ID!, name: String, email: String): User!
  deleteUser(id:ID!): User!
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
        },
        updateUser:(_, { id, name, email}) =>{
            const numericId = Number(id)
            const user = users.find(u => u.id === numericId);
            if(!user){
                throw new Error("User not found")
            }
            if (name !== undefined){
                user.name = name
            }
            if ( email !== undefined){
                user.email = email
            }
            return user
        },
        deleteUser:(_,{id}) =>{
            const numericId = Number(id)
            const index = users.findIndex(u => u.id === numericId)
            if (index === -1){
                throw new Error("User not found");
            }
            const deletedUser = users[index];
            users.splice(index,1);
            return deletedUser
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
});
