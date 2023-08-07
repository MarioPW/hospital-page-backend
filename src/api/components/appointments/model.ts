

export interface Appointment {
    patient_identification: string
    specialty: string
    doctor: string
    office: string
    schedule: string
}
export interface AppointmentReq {
    patient_identification: string
    specialty: string
    doctor_id: number
    schedule: string
}

export interface AppointmentResDB {
    appointment_id: number
    schedule: string
    specialty: string
    doctor_id: number
    patient_identification: string
    created_at: string
    updated_at: string
}