const { test, expect } = require('@playwright/test');



test("Full user lifecycle (create -> update-delete" ,async({request}) =>{
    //create user
    const createRes = await request.post("/", {
        data:{
            query: `
            mutation{
            createUser(name:"smith", email: "smith@gmail.com"){
            
            id 
            name
            email
            }}
            `
        }
    });

    expect(createRes.ok()).toBeTruthy();
    const createBody = await createRes.json();
    const userId = createBody.data.createUser.id;

    expect(createBody.data.createUser.name).toBe("smith")


    // updateUser 
    const updateRes = await request.post("/",{
        data:{
            query: `
            mutation {
            updateUser(id: ${userId}, name:"updated smith", age: 30){
            
            id 
            name 
            email
            age
            }
        }
            
            `
        }
    })
    expect(createRes.ok()).toBeTruthy()
    const updateBody = await updateRes.json();
    expect(updateBody.data.updateUser.name).toBe("updated smith");
    expect(updateBody.data.updateUser.age).toBe(30)

    // delete user

    const deleteRes = await request.post("/",{
        data:{
            query: `
            mutation{
            deleteUser(id: ${userId}){
            id
            name
            }
            }
            `
        }
    })
    expect(deleteRes.ok()).toBeTruthy()
    const deleteBody = await deleteRes.json()
    expect(deleteBody.data.deleteUser.id).toBe(userId)

    //Verify deleted

    const usersRes = await request.post("/",{
        data:{
            query:`
            query{
            users{
            id
            
        }}
            `
        }
    });
    const userBody = await usersRes.json();
    const ids = userBody.data.users.map(u => u.id);
    expect(ids).not.toContain(userId)
})