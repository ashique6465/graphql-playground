const { test, expect } = require("@playwright/test");

test("delete user", async ({ request}) =>{
    const createRes = await request.post("/",{
        data: {
            query: `
            mutation{
            createUser(name:"john", email:"john@gmail.com"){
            id 
            name
            email

            }}`
        }
    });

    expect(createRes.ok()).toBeTruthy();
    const createBody = await createRes.json();

    const userId = createBody.data.createUser.id;

    const deleteRes = await request.post("/",{
        data: {
            query: `
            mutation{
            deleteUser(id: ${userId}){
            id 
            name
            email}}`
        }
    });
    console.log("DELETE STATUS", deleteRes.status())
    const deleteBody = await deleteRes.json();
    console.log("DELETE BODY", JSON.stringify(deleteBody, null, 2 ));


    expect(deleteRes.ok()).toBeTruthy();
    expect(deleteBody.data.deleteUser.id).toBe(userId);
    expect(deleteBody.data.deleteUser.name).toBe("john");
    expect(deleteBody.data.deleteUser.email).toBe("john@gmail.com")

})