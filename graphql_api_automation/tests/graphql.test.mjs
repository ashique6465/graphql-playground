const request  = require("supertest")

const API_URL = "http://localhost:4000";

describe("GraphQL Automation", () => {
    test("Create user", async () =>{
        const res = await request(API_URL)
        .post("/")
        .send({
            query:`
            mutation{
                createUser(name: "Test",email:"test@gmail.com"){
                id
                name
                }
            }
                `
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.createUser.name).toBe("Test");

    });
    test("Get Users", async() =>{
        const res = await request(API_URL)
        .post("/")
        .send({
            query:`
            query{
            users{
            id
            name
            }
            }
            `
        });
        expect(res.body.data.users.length).toBeGreaterThan(0)
        
    })
})