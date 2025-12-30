
const graphqlRequest = require("../helpers/graphqlClient");

describe("Get Users (Negative)", () => {
    test("should fail when name is missing", async () =>{
        const mutation = `
        mutation{
        createUser(email: "fail@mail.com"){
        id}
        }`;
        const res = await graphqlRequest(mutation, {}, "valid-token");
        expect(res.body.errors).toBeDefined();
        expect(res.body.errors).toBeDefined()
    })
})