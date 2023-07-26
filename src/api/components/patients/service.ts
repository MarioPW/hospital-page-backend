import { CustomError } from "../../../utils/customErrors"
import logger from "../../../utils/logger"
import { PatientReq, Patient } from "./model"
import { PatientRepository } from "./repository"


export interface PatientService {
    getAllPatients(): Promise<Patient[]>
    createPatient(patientReq: PatientReq): Promise<Patient>
    getPatientById(id: number): Promise<Patient>
    updatePatient(id: number, updates:Partial<Patient>): Promise<Patient>
    deletePatient(id: number): Promise<void>
}

export class PatientServiceImpl implements PatientService {
    private patientRepository: PatientRepository

    constructor(patientRepository: PatientRepository){
        this.patientRepository = patientRepository
    }

    public getAllPatients(): Promise<Patient[]> {
        const patients: Promise<Patient[]> =  this.patientRepository.getAllPatients()
        return patients
    }
    
    public createPatient(patientReq: PatientReq): Promise<Patient> {
        try{
            return this.patientRepository.createPatient(patientReq)
        } catch (error){
            throw new CustomError ( 'CreationError', "Failed to create patient from service", 'pacientes')
        }
    }

    public getPatientById(id: number): Promise<Patient> {
        try {
            return this.patientRepository.getPatientById(id)
        } catch (error) {
            logger.error('Failed to get patient from service')
            throw new CustomError ( 'RecordNotFoundError', 'Record has not found yet', 'pacientes')
        }
    }

    public async updatePatient(id: number, updates: Partial<PatientReq>): Promise<Patient> {
        try {
            const existPatient =  await this.patientRepository.getPatientById(id)
            if (!existPatient) {
                throw new CustomError ( 'RecordNotFoundError', 'Record has not found yet', 'pacientes' )
            }
            const updatePatient = {...existPatient, ...updates}
            this.patientRepository.updatePatient(id, updatePatient)
            return updatePatient
        } catch (error) {
            logger.error( 'Failed to update patient from service' )
            throw new CustomError ( 'UpdateError', 'Failed to update patient from service', 'pacientes' )
        }
    }

    public async deletePatient(id: number): Promise<void> {
        try {
            const existPatient =  await this.patientRepository.getPatientById(id)
            if (!existPatient) {
                throw new CustomError ( 'RecordNotFoundError', 'Record has not found yet', 'pacientes' )
            }
            await this.patientRepository.deletePatient(id)
        } catch (error) {
            logger.error('Failed to delete patient from service')
            throw new CustomError ( 'DeleteError', 'Failed to delete patient from service', 'pacientes' )
        }
    }

   
}