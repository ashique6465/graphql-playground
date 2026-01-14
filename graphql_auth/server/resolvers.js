const bcrypt = require("bcrypt");
const User = require("./models/User")
const {createToken } = require("./auth")

module.exports = {
    Query: {
        me: async(_,__, { user}) =>{
            if(!user) return null;
            return User.findByPk(user.id);
        }
    },

    Mutation: {
        signup: async(_,{email,password}) => {
            const hashed = await bcrypt.hash(password, 10 );
            const user = await User.create({
                email,
                password: hashed
            });

            const token = createToken(user);
            return { user, token }
        },
        login: async (_, {email,password }) => {
            const user = await User.findOne({where: { email } });
            if (!user) throw new Error("User not found");

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw new Error("Wrong password");

            const token = createToken(user);
            return { user, token };
        }
    }
}