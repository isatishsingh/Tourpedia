import { models } from "../models/index.js";


export const createTestimonial = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, occupation, title, review, rating } = req.body;
        const testimonial = await models.Testimonial.create(
            { userId, name, occupation, title, review, rating }
        )
        return res.status(201).json({ success: true, data: testimonial })
    } catch (error) {
        console.log(error);
    }
}
export const getAllTestimonials = async (req, res) => {
    try {
        const userId = req.user.id;

        const testimonials = await models.Testimonial.findAll({
            where: { userId },
            include: [
                {
                    model: models.User,
                    attributes: ["id", "name", "occupation", "title", "review", "rating"]
                },
            ],
        });

        return res.status(200).json({
            success: true,
            data: testimonials,
        });
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        res.status(500).json({ success: false, error: "Server error" });
    }
};


export const getTestimonialById = async (req, res) => {
    try {
        const userId = req.user.id;
        const testimonialId = req.params.id;
        const testimonial = await models.Testimonial.findOne({ where: { userId, id: testimonialId } });
        return res.status(200).json({ success: true, data: testimonial })
    } catch (error) {
        console.log(error);
    }
}

export const updateTestimonial = async (req, res) => {
    try {
        const userId = req.user.id;
        const testimonialId = req.params.id;
        const { name, occupation, title, review, rating } = req.body;
        const testimonial = await models.Testimonial.update({name, occupation, title, review, rating}, { where: { userId, id: testimonialId } });
        return res.status(200).json({ success: true, message: 'Testimonial updated successfully' })
    } catch (error) {
        console.log(error);
    }
}
export const deleteTestimonial = async (req, res) => {
    try {
        const userId = req.user.id;
        const testimonialId = req.params.id;
        const testimonial = await models.Testimonial.destroy({ where: { userId, id: testimonialId } });
        return res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.log(error);
    }
}