// const { test, expect, request } = require("@playwright/test")

// test("signup", async ({request}) =>{
//     const signupRes = await request.post("/",{
//         data:{
//             query:`

//             mutation{
//             signup ( 
//             name: "ash",
//             email:"ash@gmail.com",
//             password: "1234"

//             ){
//             id
//             name
//             email
//             }}
//             `
//         }
//     });
//     expect(signupRes.ok()).toBeTruthy()
//     const loginRes = await request.post("/", {
//         data: {
//             query: `
//             mutation{
//             login(
//             email:"ash@gmail.com"
//             password: "1234"
//             ){
//             token
//             }}
//             `
//         }
//     });
//     const loginBody = await loginRes.json();
//     const token = loginBody.data.login.token;
//     expect(token).toBeTruthy();

//     const createRes  = await request.post("/", {
//         headers: {
//             authorization: `Bearer {$token}`,
//             "content-type": "application/json"
//         },
//         data:{
//             query: `
//             mutation {
//             createUser(
//             name: "child", email: "child@gmail.com"
//             ){
//             id 
//             name
//             }}
//             `
//         }
//     })
//     const createBody = await createRes.json();
//     expect(createBody.data.createRes.name).toBe("child")
// })

// test("login should fail with wrong password", async ({request}) =>{
//     const res = await request.post("/",{
//         data: {
//             query: `
//             mutation {
//             login(email:"ash@gmail.com", password: "wrong"){
//             token}
//             }
//             `
//         }
//     })
//     const body = await res.json();
//     expect(body.errors[0].message).toBe("Invalid credentials")
// })