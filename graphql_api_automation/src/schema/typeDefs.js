const typeDefs = `
    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Query{
        users: [User!]
    }

    type Mutation{
        createUser(name: String!, email: String!): User!
        updateUser(id: ID!, name: String, age: Int): User!
        deleteUser(id: ID!): User!
    }
        `

    module.exports = typeDefs;