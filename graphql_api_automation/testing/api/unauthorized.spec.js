const { test, expect, request } = require("@playwright/test")

test("createUser should failed without token", async ({request}) =>{
    const res = await request.post("/",{
        headers: {
            "Content-Type": "application/json",
            "authorization": ""
        },
        data:{
            query:`
            mutation {
            createUser(name: "hacker", email: "hack@test.com"){
            id
            name
            email
            }}
            `
        }
    })
    const body = await res.json();
    expect(body.errors).toBeDefined()
    expect(body.errors[0].message).toBe("Unauthorized")
});

test("user query should fail without token", async ({request}) =>{
    const res = await request.post("/",{
        headers:{
            "Content-Type": "application/json",
            "authorization": "",
        },
        data:{
            query:`
            query{
            users{
        id
        }
            }
            `
        }

    })
    const body = await res.json();
    expect(body.errors).toBeDefined()
    expect(body.errors[0].message).toBe("Unauthorized")
})