import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `
    type User{
        id: ID!
        name: String!
        email: String!
    }

    type Query{
        users: [User!]
    }

    type Mutation{
        createUser(name: String!, email: String!): User!
    }
        `
    const users = [];
    const resolvers = {
        Query: {
            users: () => users,
        },
        Mutation:{
            createUser: (_,{name, email}) => {
                const user = {id: users.length + 1, name, email };
                users.push(user)
                return user
            }
        }
    }
const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const {url} = await startStandaloneServer(server,{
    listen: { port:4000},
})

console.log(`GraphQL running at ${url}`)