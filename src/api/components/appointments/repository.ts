import { db } from "../../../config/database"
import { Appointment, AppointmentReq, AppointmentResDB } from "./model"
import logger from '../../../utils/logger'
import { CustomError } from "../../../utils/customErrors"

export class AppointmentRepository {
    public async createAppointment(appointment: AppointmentReq): Promise<AppointmentResDB> {
        try {
            const [createdAppointment] =  await db('citas').insert(appointment).returning('*') 
            return createdAppointment
        } catch (error) {
            throw new CustomError ('CreationError', 'Failed to create appointment', 'citas')
        }
    }

    public async getAllAppointments(): Promise<Appointment[]> {
        try {
            return  db.select('*').from('citas1')
        } catch (error) {
            
            throw new CustomError ( 'GetAllError', "Failed getting all appointments from repository", 'citas')
        }
    }

    public async getAppointmentById(id: number): Promise<AppointmentResDB> {
        try{
            const appointment = await db('citas').where({ id_cita: id }).first()
            return appointment
        } catch (error){
            logger.error( 'Failed get appointment by id in repository', {error})
            throw new CustomError ('RecordNotFoundError', 'Record has not found yet', 'citas')
        }
    }
    
    // Tarea: Terminar el crud de citas y pacientes -- Upadte Appoinment, Delete Appoinment --

    public async updateAppointment(id: number, updates: Partial<AppointmentReq>): Promise<void> {
        try{
            await db('citas').where({ id_cita: id }).update(updates)
        } catch (error){
            logger.error( 'Failed updated appointment in repository', {error})
            throw new CustomError ('UpdateError', 'Failed updated appointment in repository', 'citas')
        }
    }

    public async deleteAppointment(id: number): Promise<void> {
        try{
            await db('citas').where({ id_cita: id }).del()
        } catch (error){
            logger.error( 'Failed deleting Appointment in repository', {error})
            throw new CustomError ( 'DeleteError','Failed deleting Appointment in repository', 'citas')
        }
    }
}