import { models } from "../models/index.js";


export const create = async (req, res) => {
    try {
        const { name, email, description } = req.body;
        const contact = await models.Contact.create({ name, email, description });
        return res.status(201).json({ success: true, data: contact })
    } catch (error) {
        console.log(error);
    }
}


export const getAll = async (req, res) => {
    try {
        const { rows, count } = await models.Contact.findAndCountAll();
        return res.status(200).json({ success: true, data: rows, count });
    } catch (error) {
        console.log(error);
    }
}