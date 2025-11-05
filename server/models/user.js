import { sequelize } from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: false,

        validate: {
            isNumeric: true,
            len: [10, 10],
        }
    },
    country: {
        type: DataTypes.STRING,
        defaultValue: 'INDIA',
    },
    city: {
        type: DataTypes.STRING,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    paranoid: true,
});

export default User;