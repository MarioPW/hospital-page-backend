import { nodeModuleNameResolver } from "typescript"
import { CustomError } from "../../../utils/customErrors"
import logger from "../../../utils/logger"
import { Doctor, DoctorReq } from "./model"
import { DoctorRepository } from "./repository"


export interface DoctorService {
    getAllDoctors(): Promise<Doctor[]>
    createDoctor(doctorReq: DoctorReq): Promise<Doctor>
    getDoctorById(id: number): Promise<Doctor>
    updateDoctor(id: number, updates:Partial<DoctorReq>): Promise<Doctor>
    deleteDoctor(id: number): Promise<void>
}

export class DoctorServiceImpl implements DoctorService {
    private doctorRepository: DoctorRepository

    constructor(doctorRepository: DoctorRepository){
        this.doctorRepository = doctorRepository
    }

    public getAllDoctors(): Promise<Doctor[]> {
        const doctors: Promise<Doctor[]> =  this.doctorRepository.getAllDoctors()
        return doctors
    }
    
    public createDoctor(doctorReq: DoctorReq): Promise<Doctor> {
        try{
            return this.doctorRepository.createDoctor(doctorReq)
        } catch (error){
            throw new CustomError ('CreationError', "Failed to create doctor in service", "doctors")
        }
    }

    public getDoctorById(id: number): Promise<Doctor> {
        try {
            return this.doctorRepository.getDoctorById(id)
        } catch (error) {
            logger.error('Failed to get doctor from service')
            throw new CustomError ('RecordNotFoundError', 'Record has not found yet', 'doctors')
        }
    }

    public async updateDoctor(id: number, updates: Partial<DoctorReq>): Promise<Doctor> {
        try {
            const existDoctor =  await this.doctorRepository.getDoctorById(id)
            if (!existDoctor) {
                throw new CustomError ( 'RecordNotFoundError', 'Record has not found yet', 'doctors' )
            } else {
            const updateDoctor = {...existDoctor, ...updates}
            this.doctorRepository.updateDoctor(id, updateDoctor)
            return updateDoctor }
        } catch (error) {
            logger.error( 'Failed to update doctor from service' )
            throw new CustomError ( 'UpdateError', 'Failed to update doctor from service', 'doctors' )
        }
    }

    public async deleteDoctor(id: number): Promise<void> {
        try {
            const existDoctor =  await this.doctorRepository.getDoctorById(id)          
            await this.doctorRepository.deleteDoctor(existDoctor.id_doctor)           
        } catch (error) {          
            logger.error('Failed to delete doctor from service')
            throw new CustomError ( 'DeleteError', 'Failed to delete doctor from service', 'doctors' )          
        }
    }
}
