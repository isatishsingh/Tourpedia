import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";


const Testimonial = sequelize.define("Testimonial", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    name:{
        type: DataTypes.TEXT,
    },
    occupation: {
        type: DataTypes.TEXT,
    },
    title: {
        type: DataTypes.TEXT,
    },
    review: {
        type: DataTypes.TEXT,
    },
    rating: {
        type: DataTypes.INTEGER,
    },
}, {
    paranoid: true
});


export default Testimonial;