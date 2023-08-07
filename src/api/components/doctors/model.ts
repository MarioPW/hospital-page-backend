
export interface Doctor {
    doctor_id: number
    first_name: string
    last_name: string
    specialty: string
    office: string
    email?: string
    created_at?: string
    updated_at?: string
}

export interface DoctorReq {
    first_name: string
    last_name: string
    specialty: string
    office: string
    email?: string
}