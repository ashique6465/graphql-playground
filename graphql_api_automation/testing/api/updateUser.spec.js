const { test, expect } = require('@playwright/test');

test("update user", async ( { request}) => {
    const createRes = await request.post("/", {
        data: {
            query: `
            mutation {
            createUser(name: "alice", email: "alice@gmail.com"){
            id 
            name
            email
            }}`
            ,
        }
    });

    expect(createRes.ok()).toBeTruthy();
    const createBody = await createRes.json();

    const userId = createBody.data.createUser.id;

    const updateRes = await request.post("/", {
        data:{
            query: `
            mutation{
            updateUser(id: ${userId}, name: "alice_updated", age: 25){
            id 
            name
            email
            age}}`
        }
    })
    console.log("STATUS", updateRes.status());
    const updateBody = await updateRes.json();
    console.log("BODY", JSON.stringify(updateBody, null, 2));

    expect(updateRes.ok()).toBeTruthy();
    expect(updateBody.data.updateUser.name).toBe("alice_updated");
    expect(updateBody.data.updateUser.age).toBe(25);
    expect(updateBody.data.updateUser.email).toBe("alice@gmail.com");
})