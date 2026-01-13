// async function getAuthToken(request){
//     const res = await request.post("/", {
//         data:{
//             query: `
//             mutation {
//             login(email:"john@gmail.com", password: "123456"){
//             token
//             }}
//             `
//         }
//     });
//     const body = await res.json();
//     if(body.errors){
//         throw new Error (body.errors[0].message)
//     };
//     return body.data.login.token
// };

// module.exports = {getAuthToken}