const request = require("supertest");
const API_URL = "http://localhost:4000";

const graphqlRequest = (query, variables = {}, token = null) =>{
    const req = request(API_URL).post("/");
    if (token){
        req.set("Authorization", `Bearer ${token}`)
    }
    return req.send({ query, variables})

}

module.exports = graphqlRequest;