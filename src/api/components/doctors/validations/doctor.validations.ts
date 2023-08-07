import Joi from 'joi'
import { Especialidad } from '../../../../utils/model'

const createDoctorSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    specialty: Joi.string().valid(...Object.values(Especialidad)).required(),
    office: Joi.string().required(),
    email: Joi.string().email().required()
})

export { createDoctorSchema }