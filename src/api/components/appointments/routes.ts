import  { Router} from 'express'
import { AppointmentController, AppointmentControllerImpl } from './controller'
import { AppointmentRepository } from './repository'
import { AppointmentServiceImpl } from './service'
import { DoctorRepository } from '../doctors/repository'

const router = Router()
const repository = new AppointmentRepository()
const repositoryDoctor = new DoctorRepository()
const service = new AppointmentServiceImpl(repository, repositoryDoctor)
const appointmentController: AppointmentController = new AppointmentControllerImpl(service)

router.get('',  appointmentController.getAllAppointments.bind(appointmentController))
router.post('/create',  appointmentController.createAppointment.bind(appointmentController))
router.get('/:id',  appointmentController.getAppointmentById.bind(appointmentController))
router.put('/:id',  appointmentController.updateAppointment.bind(appointmentController))
router.delete('/:id',  appointmentController.deleteAppointment.bind(appointmentController))

export default router