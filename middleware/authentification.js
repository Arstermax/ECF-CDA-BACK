const outils = require('../src/utils/outils.js')
const dotenv = require('dotenv')
dotenv.config();

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = outils.jwt.verify(token, process.env.RANDOM_TOKEN_SECRET)
        const {userId} = decodedToken;
        req.auth = {
            userId
        }
        return next();
    } catch (err) {
        res.status(401).json({ message: "Merci de vous connecter !" })
    }

}
module.exports = isAuthenticated;