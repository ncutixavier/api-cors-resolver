import Joi from 'joi'

const userValidation = (req, res, next) => {
    const validation = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(7).required().strict(),
        gender: Joi.string().required(),
        title: Joi.string().required(),
        department: Joi.string().required(),
        phone: Joi.number().required(),
    });
    const result = validation.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    next();
}

export default userValidation
