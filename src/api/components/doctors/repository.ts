import { db } from "../../../db/database"
import { Doctor, DoctorReq } from "./model"
import logger from '../../../utils/logger'
import { CustomError } from "../../../utils/customErrors"

export class DoctorRepository {
    public async createDoctor(doctor: DoctorReq): Promise<Doctor> {
        try {
            const [createdDoctor] =  await db('doctores').insert(doctor).returning('*') // select * from doctors where id_doctor=?
            return createdDoctor
        } catch (error) {
            throw new CustomError ( 'CreationError','Failed to create doctor in repository', 'doctors')
        }
    }

    public async getAllDoctors(): Promise<Doctor[]> {
        try {
            return  db.select('*').from('doctores')
        } catch (error) {
            throw new CustomError( 'GetAllError', 'Failed getting all doctors in repository', 'doctors' )
        }
    }

    public async getDoctorById(id: number): Promise<Doctor> {
        try{
            const doctor: Doctor = await db('doctores').where({ id_doctor: id }).first()
            return doctor
        } catch (error){
            logger.error( 'Failed get doctor by id in the repository', {error})
            throw new CustomError ('RecordNotFoundError','Record has not been found yet', 'doctors')
        }
    }

    public async updateDoctor(id: number, updates: Partial<DoctorReq>): Promise<void> {
        try{
            await db('doctores').where({ id_doctor: id }).update(updates);      
        } catch (error){
            logger.error( 'Failed updated doctor in repository', {error})
            throw new CustomError ('UpdateError', 'Failed updated doctor in repository', 'doctors')
        }
    }

    public async deleteDoctor(id: number): Promise<void> {
        try{
            await db('doctores').where({ id_doctor: id }).del()
        } catch (error){
            logger.error( 'Failed deleting doctor in repository', {error})
            throw new CustomError ( 'DeleteError', 'Failed deleting doctor in repository', 'doctors')
        }
    }
}

export default{
    DoctorRepository
}