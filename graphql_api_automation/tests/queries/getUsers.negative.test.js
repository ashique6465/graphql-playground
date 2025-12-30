
const graphqlRequest = require("../helpers/graphqlClient");

describe("Gets Users (Unauthorized)", () => {
    test("should return error when no token is provided", async () => {
        const query = `
        query{
        users{
        id
        name}}`
        const res = await graphqlRequest(query);
        expect(res.body.errors).toBeDefined();
        expect(res.body.errors[0].message).toBe("Unauthorized");
    })
})