const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');

const bcryptPassword = async(password)=>{
    return await bcrypt.hash(password,10)
}

const bcryptCompare = async(password,hashPassword)=>{
    return await bcrypt.compare(password,hashPassword)
}
const generateJWT = (payload)=>{
    return jwt.sign({payload},process.env.JWT_SECRET,{expiresIn: '1d'})
}
const verifyJWT = (token)=>{
    return jwt.verify(token,process.env.JWT_SECRET)
}

module.exports = {bcryptPassword,bcryptCompare,generateJWT,verifyJWT}