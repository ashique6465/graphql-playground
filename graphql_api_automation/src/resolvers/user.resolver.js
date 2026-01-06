const { users } = require("../data/users");

const resolvers = {
  Query: {
    users: (_, __, context) => {
      if (!context.isAuthenticated) {
        throw new Error("Unauthorized");
      }
      return users;
    },
  },

  Mutation: {
    createUser: (_, { name, email }, context) => {
      if (!context.isAuthenticated) {
        throw new Error("Unauthorized");
      }

      const user = {
        id: users.length + 1,
        name,
        email,
        age: null,
      };

      users.push(user);
      return user;
    },

    updateUser: (_, { id, name, age }, context) => {
      if (!context.isAuthenticated) {
        throw new Error("Unauthorized");
      }

      const user = users.find((u) => u.id == id);
      if (!user) {
        throw new Error("User not found");
      }

      if (name) user.name = name;
      if (age) user.age = age;

      return user;
    },
    deleteUser: (_, {id}, context) => {
        if (!context.isAuthenticated){
            throw new Error("Unauthorized");
        }
        const index = users.findIndex((u) => u.id == id);
        if(index === -1){
            throw new Error("User not found");
        }

        const deletedUser = users[index];
        users.splice(index,1);
        return deletedUser
    }
  },
};

module.exports = resolvers;
