import  { Router} from 'express'
import { DoctorController, DoctorControllerImpl } from './controller'
import { DoctorRepository } from './repository'
import { DoctorServiceImpl } from './service'


const router = Router()
const doctorRepository = new DoctorRepository()
const doctorService = new DoctorServiceImpl(doctorRepository)
const doctorController: DoctorController = new DoctorControllerImpl(doctorService)


router.get('',  doctorController.getAllDoctors.bind(doctorController))
router.post('/create',  doctorController.createDoctor.bind(doctorController))
router.get('/:id',  doctorController.getDoctorById.bind(doctorController))
router.put('/:id',  doctorController.updateDoctor.bind(doctorController))
router.delete('/:id',  doctorController.deleteDoctor.bind(doctorController))


export default router