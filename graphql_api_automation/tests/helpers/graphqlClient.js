const request = require("supertest");
const API_URL = "http://localhost:4000";

const graphqlRequest = (query, variables = {}) =>{
    return request(API_URL)
    .post("/")
    .send({query, variables})

}

module.exports = graphqlRequest;