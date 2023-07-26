import  { Router} from 'express'
import { AppointmentController, AppointmentControllerImpl } from './controller'
import { AppointmentRepository } from './repository'
import { AppointmentServiceImpl } from './service'
import { DoctorRepository } from '../doctors/repository'

const router = Router()
const repository = new AppointmentRepository()
const repositoryDoctor = new DoctorRepository()
const service = new AppointmentServiceImpl(repository, repositoryDoctor)
const controller: AppointmentController = new AppointmentControllerImpl(service)

router.get('',  controller.getAllAppointments.bind(controller))
router.post('/create',  controller.createAppointment.bind(controller))
router.get('/:id',  controller.getAppointmentById.bind(controller))

export default router