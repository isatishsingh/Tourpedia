import { models } from "../models/index.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    try {
        const { email, password, firstname, lastname, phone, country, city } = req.body;
        const isAlreadyRegistered = await models.User.findOne({ where: { email } });
        if (isAlreadyRegistered) {
            return res.status(400).json({ error: 'User already registered' });
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await models.User.create({ email, password: encryptedPassword, firstname, lastname, phone, country, city });
        return res.status(201).json({ success: true, data: user })
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await models.User.findOne({ where: { email } });   
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        user.token = token;
        await user.save();
        return res.status(200).json({
            success: true,
            token
        })
    } catch (error) {
        console.log(error);
    }
}


export const logOut = async (req, res) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        user.token = null;
        await user.save();
        return res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.log(error);
    }
}