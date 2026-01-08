const {test , expect } = require('@playwright/test');

test("create user ", async ({request}) => {
    const response = await request.post('/', {
        data: {
            query: `
            mutation{
            createUser(name:"john", email: "john@gmail.com"){
            id 
            name
            email
            }}`
        }
    });
    console.log("STATUS", response.status());
    const body = await response.json();
    console.log("BODY", JSON.stringify(body, null, 2));
    expect(response.ok()).toBeTruthy()
    // expect(response.ok()).toBeTruthy();
    // const body = await response.json();
    // expect(body.data.createUser.name).toBe("john");
    // expect(body.data.createUser.email).toBe("john@gmail.com")
})