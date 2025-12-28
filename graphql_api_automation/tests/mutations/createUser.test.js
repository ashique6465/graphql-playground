const graphqlRequest = require("../helpers/graphqlClient");

describe("Create User Mutation", () =>{
    test("should create a new user", async () =>{
        const mutation = `
         mutation {
            createUser(name: "ash", email: "ash@gmail.com"){
                id
                name
                email
            }
        }
            `;
            const res = await graphqlRequest(mutation);
            expect(res.statusCode).toBe(200);
            expect(res.body.data.createUser.name).toBe("ash")
    })
})