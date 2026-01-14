const express = require("express");
const { ApolloServer } = require("apollo-server-express")
const typeDefs = require("./schema");
const resolvers = require("./resolvers")
const {getUserFromToken } = require("./auth");
const sequelize = require("./db");

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) =>{
        const auth = req.headers.authorization || "";
        const token = auth.replace("Bearer ", "");
        const user = getUserFromToken(token);
        return { user }
    }
});

(async ()=>{
    await sequelize.sync();
    await server.start();
    server.applyMiddleware({app});

    app.listen(4000, ()=> {
        console.log("GraphQL running at http://localhost:4000/graphql")
    })
})();