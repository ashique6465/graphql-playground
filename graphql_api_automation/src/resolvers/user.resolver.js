const {users} = require("../data/users")

const resolvers = {
        Query: {
            users: (_, __, context) => {
                if (!context.isAuthenticated){
                    throw new Error("Unauthorized")
                }
                return users;
            }
        },
        Mutation:{
            createUser: (_,{name, email}, context) => {
                if (!context.isAuthenticated){
                    throw new Error("Unauthorized");
                }
                const user = {id: users.length + 1, name, email };
                users.push(user)
                return user
            }
        }
    }

    module.exports = resolvers;