const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) =>
{
    const token = req.header('auth-token');
    
    if (!token)
    {
        return res.send(401).json({error: 'Access Denied.'});
    }

    try
    {
        const decrypted = jwt.verify(token, JWT_SECRET);
        req.user_id =  decrypted.id;
        next();
    }

    catch
    {
        res.status(401).send({error: 'Access Denied.'});
    }   
}

module.exports = verifyToken;