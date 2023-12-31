import { db } from "../../../db/database"
import { Patient, PatientReq,  } from "./model"
import logger from '../../../utils/logger'
import { CustomError } from "../../../utils/customErrors"

export class PatientRepository {
    public async createPatient(patient: PatientReq): Promise<Patient> {
        try {
            const [createdPatient] =  await db('patients').insert(patient).returning('*') 
            return createdPatient
        } catch (error) {
            throw new CustomError ( 'CreationError', 'Failed to create patient in repository', 'patients')
        }
    }

    public async getAllPatients(): Promise<Patient[]> {
        try {
            return  db.select('*').from('patients')
        } catch (error) {
            throw new CustomError ( 'GetAllError', 'Failed get all patients in repository', 'patients')
        }
    }

    public async getPatientById(id: number): Promise<Patient> {
        try{
            const patient = await db('patients').where({ id_paciente: id }).first()
            return patient
        } catch (error){
            logger.error( 'Failed get patient by id in repository', {error})
            throw new CustomError ( 'RecordNotFoundError', 'Record has not found yet', 'patients' )
        }
    }

    public async updatePatient(id: number, updates: Partial<PatientReq>): Promise<void> {
        try{
            await db('patients').where({ id_paciente: id }).update(updates)
        } catch (error){
            logger.error( 'Failed updated patient in repository', {error})
            throw new CustomError ('UpdateError', 'Failed updated patient in repository', 'patients')
        }
    }
 
    public async deletePatient(id: number): Promise<void> {
        try{
            await db('patients').where({ id_paciente: id }).del()
        } catch (error){
            logger.error( 'Failed deleting patient in repository', {error})
            throw new CustomError ( 'DeleteError', 'Failed deleting patient in repository', 'patients')
        }
    }

}