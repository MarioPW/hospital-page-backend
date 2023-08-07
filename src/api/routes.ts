import  { Router } from 'express'
import doctorRoutes from './components/doctors/routes'
import citaRoutes from './components/appointments/routes'
import pacienteRoutes from './components/patients/routes'


const router = Router()

router.use('/doctors', doctorRoutes)
router.use('/appointments', citaRoutes)
router.use('/patients', pacienteRoutes)

export default router