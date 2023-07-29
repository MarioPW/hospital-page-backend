import { CustomError } from "../../../utils/customErrors"
import logger from "../../../utils/logger"
import { AppointmentReq, Appointment, AppointmentResDB } from "./model"
import { AppointmentRepository } from "./repository"
import { DoctorRepository } from "../doctors/repository"
import { Doctor } from "../doctors/model"

export interface AppointmentService {
    getAllAppointments(): Promise<Appointment[]>
    createAppointment(patientReq: AppointmentReq): Promise<Appointment>
    getAppointmentById(id: number): Promise<Appointment>
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
            const doctor = await this.doctorRepository.getDoctorById(appointmentDb.id_doctor)
            const appointment: Appointment = mapAppointment(appointmentDb, doctor)
            return appointment
        } catch (error){
            throw new CustomError ( 'CreationError',"Failed to create appointment in service", 'appointments')
        }
    }

    public async getAppointmentById(id: number): Promise<Appointment> {
        try {
            const appointmentDb =  await this.appointmentRepository.getAppointmentById(id)
            const doctor = await this.doctorRepository.getDoctorById(appointmentDb.id_doctor)
            const appointment: Appointment = mapAppointment(appointmentDb, doctor)
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
            const updateAppointment = {...existAppointment, ...updates}
            this.appointmentRepository.updateAppointment(id, updateAppointment)
            return updateAppointment
        } catch (error) {
            logger.error( 'Failed to update appointment from service' )
            throw new CustomError ( 'UpdateError', 'Failed to update appointment from service', 'appointments' )
        }
    }

    public async deleteAppointment(id: number): Promise<void> {
        try {
            const existAppointment =  await this.appointmentRepository.getAppointmentById(id)
            if (!existAppointment) {
                throw new CustomError ( 'RecordNotFoundError', 'Record has not found yet', 'appointments' )
            }
            await this.appointmentRepository.deleteAppointment(id)
        } catch (error) {
            logger.error('Failed to delete Appointment from service')
            throw new CustomError ('DeleteError','Failed to delete Appointment from service', 'appointments')
        }
    }
}

export function mapAppointment(appointmentDb: AppointmentResDB, doctor: Doctor): Appointment {
    const appointment: Appointment = {
        identificacion_paciente: appointmentDb.identificacion_paciente, 
        especialidad:appointmentDb.especialidad,
        doctor: `${doctor.nombre} ${doctor.apellido}`,
        consultorio: doctor.consultorio,
        horario: appointmentDb.horario
    }
    return appointment
}