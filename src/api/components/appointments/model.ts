export interface Appointment {
    identificacion_paciente: string
    especialidad: string
    doctor: string
    consultorio: number
    horario: string
}

export interface AppointmentReq {
    identificacion_paciente: string
    especialidad: string
    id_doctor: number
    horario: string
}

export interface AppointmentResDB {
    id_cita: number
    horario: string
    especialidad: string
    id_doctor: number
    identificacion_paciente: string
    created_at: string
    updated_at: string
}