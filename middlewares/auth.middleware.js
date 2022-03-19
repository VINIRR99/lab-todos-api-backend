const { verify } = require("jsonwebtoken");

const authorization = (req, res, next) => {
    try{
        const token = req.get("Authorization");
        if (!token) throw new Error("Request without token");

        const tokenWithoutBearer = token.split(" ")[1];

        const decodedToken = verify(tokenWithoutBearer, process.env.SECRET_JWT)
        req.user = { ...decodedToken };
        next();
    }catch(error){res.status(401).json({ msg: 'Unauthorized', error: error.message })};
};

module.exports = authorization;