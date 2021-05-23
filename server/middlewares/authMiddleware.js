const jwt = require('jsonwebtoken');
const [User, Admin] = require('../models/User');

const authReq = (req, res, next) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    jwt.verify(token, "access-SecretKey", async (err, decodedToken) => {
        if(!err) {
            const user = await User.findById(decodedToken.id) 
            ? await User.findById(decodedToken.id) 
            : await Admin.findById(decodedToken.id)
            
            req.user = user;
            next();
        }else if (err.message === 'jwt expired') {
            return res.json({error: 'Access Token expired'})
        } else res.status(200).json({error: 'User not authenticated'})
    })
}

module.exports = { authReq };