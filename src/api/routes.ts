import  { Router } from 'express'
import doctorRoutes from './components/doctors/routes'
import citaRoutes from './components/appointments/routes'
import pacienteRoutes from './components/patients/routes'


const router = Router()

router.use('/doctores', doctorRoutes)
router.use('/citas', citaRoutes)
router.use('/pacientes', pacienteRoutes)

export default router