import { CustomError } from "../../../utils/customErrors"
import logger from "../../../utils/logger"
import { AppointmentReq, Appointment, AppointmentResDB } from "./model"
import { AppointmentRepository } from "./repository"
import { DoctorRepository } from "../doctors/repository"
import { Doctor } from "../doctors/model"

export interface AppointmentService {
    getAllAppointments(): Promise<Appointment[]>
    createAppointment(patientReq: AppointmentReq): Promise<Appointment>
    getAppointmentById(id: number): Promise<AppointmentResDB>
    updateAppointment(id: number, updates:Partial<AppointmentReq>): Promise<AppointmentReq>
    deleteAppointment(id: number): Promise<void>
}


export class AppointmentServiceImpl implements AppointmentService {
    private appointmentRepository: AppointmentRepository
    private doctorRepository: DoctorRepository

    constructor(appointmentRepository: AppointmentRepository, doctorRepository: DoctorRepository){
        this.appointmentRepository = appointmentRepository
        this.doctorRepository = doctorRepository
    }

    public async getAllAppointments(): Promise<Appointment[]> {
        try{        
            const patients = await this.appointmentRepository.getAllAppointments()
            return patients
        } catch (error){
            logger.error(error)
            throw new CustomError ( 'GetAllError', "Failed getting all appointments from service", "appointments")
        }
    }
    
    public async createAppointment(appointmentReq: AppointmentReq): Promise<Appointment> {
        try{
            const appointmentDb = await this.appointmentRepository.createAppointment(appointmentReq) 
            const doctor = await this.doctorRepository.getDoctorById(appointmentDb.doctor_id)
            const appointment: Appointment = mapAppointment(appointmentDb, doctor)
            return appointment
        } catch (error){
            throw new CustomError ( 'CreationError',"Failed to create appointment in service", 'appointments')
        }
    }

    public async getAppointmentById(id: number): Promise<AppointmentResDB> {
        try {
            const appointment =  await this.appointmentRepository.getAppointmentById(id)
            return appointment;
            }
        catch (error) {
            logger.error('Failed to get appointment from service')
            throw new CustomError ( 'RecordNotFoundError', 'Record has not found yet', 'appointments')
        }
    }

    public async updateAppointment(id: number, updates: Partial<AppointmentReq>): Promise<AppointmentReq> {
        try {
            const existAppointment =  await this.appointmentRepository.getAppointmentById(id)
            if (!existAppointment) {
                throw new CustomError ( 'RecordNotFoundError', 'Record has not found yet', 'appointments' )
            }
            const updatedAppointment = {...existAppointment, ...updates}
            this.appointmentRepository.updateAppointment(id, updatedAppointment)
            return updatedAppointment
        } catch (error) {
            logger.error( 'Failed to update appointment from service' )
            throw new CustomError ( 'UpdateError', 'Failed to update appointment from service', 'appointments' )
        }
    }

    public async deleteAppointment(id: number): Promise<void> {
        try {
            const existAppointment =  await this.appointmentRepository.getAppointmentById(id)
            await this.appointmentRepository.deleteAppointment(existAppointment.appointment_id)
        } catch (error) {
            logger.error('Failed to delete Appointment from service')
            throw new CustomError ('DeleteError','Failed to delete Appointment from service', 'appointments')
        }
    }
}

export function mapAppointment(appointmentDb: AppointmentResDB, doctor: Doctor): Appointment {
    const appointment: Appointment = {
        patient_identification: appointmentDb.patient_identification, 
        specialty:appointmentDb.specialty,
        doctor: `${doctor.first_name} ${doctor.last_name}`,
        office: doctor.office,
        schedule: appointmentDb.schedule
    }
    return appointment
}