const jwt = require("jsonwebtoken");
const {unauthorized} = require('../errors/index')

const auth = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new unauthorized('Unauthorized access')
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const {name,userId} = decoded;
        req.user = {name,userId}
        next();
    } catch (error) {
        throw new unauthorized('Unauthorized access')
    }
}

module.exports = auth