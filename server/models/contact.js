import { sequelize } from '../config/database.js';
import { Model, DataTypes } from 'sequelize';


const Contact = sequelize.define('Contact', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    description: {
        type: DataTypes.STRING,
    }
}, {
    paranoid: true,
});


export default Contact;