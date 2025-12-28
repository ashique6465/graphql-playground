const users = require("../data/users")

const resolvers = {
        Query: {
            users: () => users,
        },
        Mutation:{
            createUser: (_,{name, email}) => {
                const user = {id: users.length + 1, name, email };
                users.push(user)
                return user
            }
        }
    }

    module.exports = resolvers;