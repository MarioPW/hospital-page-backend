import { db } from "../../../db/database"
import { Appointment, AppointmentReq, AppointmentResDB } from "./model"
import logger from '../../../utils/logger'
import { CustomError } from "../../../utils/customErrors"

export class AppointmentRepository {
    public async createAppointment(appointment: AppointmentReq): Promise<AppointmentResDB> {
        try {
            const [createdAppointment] =  await db('appointments').insert(appointment).returning('*') 
            return createdAppointment
        } catch (error) {
            throw new CustomError ('CreationError', 'Failed to create appointment', 'appointments')
        }
    }

    public async getAllAppointments(): Promise<Appointment[]> {
        try {
            return  db.select('*').from('appointments')
        } catch (error) {
            
            throw new CustomError ( 'GetAllError', "Failed getting all appointments from repository", 'appointments')
        }
    }

    public async getAppointmentById(id: number): Promise<AppointmentResDB> {
        try{
            const appointment = await db('appointments ').where({ id_cita: id }).first()
            return appointment
        } catch (error){
            logger.error( 'Failed get appointment by id in repository', {error})
            throw new CustomError ('RecordNotFoundError', 'Record has not found yet', 'appointments')
        }
    }
    
    public async updateAppointment(id: number, updates: Partial<AppointmentReq>): Promise<void> {
        try{
            await db('appointments ').where({ id_cita: id }).update(updates)
        } catch (error){
            logger.error( 'Failed updated appointment in repository', {error})
            throw new CustomError ('UpdateError', 'Failed updated appointment in repository', 'appointments')
        }
    }

    public async deleteAppointment(id: number): Promise<void> {
        try{
            await db('appointments ').where({ id_cita: id }).del()
        } catch (error){
            logger.error( 'Failed deleting Appointment in repository', {error})
            throw new CustomError ( 'DeleteError','Failed deleting Appointment in repository', 'appointments')
        }
    }
}