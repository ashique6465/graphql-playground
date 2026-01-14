


import {test, expect, request } from "@playwright/test";

const URL = "http://localhost:4000/graphql";

test("GraphQL Auth Flow", async() =>{
    const api = await request.newContext();
    const email = `user${Date.now()}@test.com`
    const signup = await api.post(URL, {
        data: {
            query: `
            mutation {
            signup(email:"${email}", password: "123456"){
            token 
            user { email }
            }}
            `
        }
    });

    const signupJson = await signup.json();
    console.log(JSON.stringify(signupJson, null , 2))
    const token = signupJson.data.signup.token;
    expect(token).not.toBeNull();

    const login = await api.post(URL,{
        data:{
            query:`
            mutation{
            login(email: "${email}", password:"123456"){
            token
            }}
            `
        }
    });
    const loginJson = await login.json();
    console.log("LOGIN:", loginJson)
    const loginToken = loginJson.data.login.token;
    expect(loginToken).not.toBeNull();


    const me  = await api.post(URL, {
        headers: {
            Authorization: `Bearer ${loginToken}`
        },
        data: {
            query: `{me { email } }`
        }
    });
    const meJson = await me.json();
    expect(meJson.data.me.email).toBe(email)
})