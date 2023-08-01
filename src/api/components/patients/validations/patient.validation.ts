import Joi from 'joi'

const createPatientSchema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    identification: Joi.string().required(),
    phone: Joi.number().integer().required(),
    email: Joi.string().optional().required()
})

export { createPatientSchema }
