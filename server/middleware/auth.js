import jwt from 'jsonwebtoken';
import { models } from '../models/index.js';

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (!token || !token.startsWith("Bearer ")) {
            res.status(401).json({ error: "Access denied. No token provided." });
        }
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await models.User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = user;
        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;