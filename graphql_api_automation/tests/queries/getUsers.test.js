const graphqlRequest = require("../helpers/graphqlClient");
const {resetUsers} = require("../../src/data/users");

beforeEach(() => {
    resetUsers();
})

describe("Get Users (Authorized)", ()=>{
    test("should return users when token is valid", async () =>{
        const query = `
        query{
        users{
        id
        name
        }
        }
        `;
        const res = await graphqlRequest(query, {}, "valid-token");
        expect(res.statusCode).toBe(200);
        expect(res.body.data.users).toBeDefined();
    })
})