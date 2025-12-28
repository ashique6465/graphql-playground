const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")

const typeDefs = require("./schema/typeDefs");
const resolvers = require("./resolvers/user.resolver")
  

async function startServer() {
   const server = new ApolloServer({
    typeDefs,
    resolvers,
    });
    const {url} = await startStandaloneServer(server,{
    listen: { port:4000},
}) 

console.log(`GraphQL running at ${url}`)

}
startServer();


