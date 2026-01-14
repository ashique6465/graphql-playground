const jwt = require("jsonwebtoken");
const SECRET = "hcl-secret";

exports.createToken = (user) =>{
    return jwt.sign(
        { id: user.id, email: user.email },
        SECRET,
        { expiresIn: "1d" }
    )
};

exports.getUserFromToken = (token) =>{
    try{
        return jwt.verify(token, SECRET)
    } catch {
        return null
    }
}