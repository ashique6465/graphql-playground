const graphqlRequest = require("../helpers/graphqlClient");

describe("Get Users", ()=>{
    test("should return users list", async () =>{
        const query = `
        query{
        users{
        id
        name
        email
        }
        }
        `;
        const res = await graphqlRequest(query);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.users.length).toBeGreaterThan(0)
    })
})