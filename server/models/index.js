import User from './user.js';
import Contact from './contact.js';
import Testimonial from './testimonial.js';


export const models = {
    User,
    Contact,
    Testimonial,
}


User.hasMany(Testimonial, { foreignKey: 'userId' });
Testimonial.belongsTo(User);
