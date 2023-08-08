export interface Patient {
    patient_id: number
    first_name: string
    last_name: string
    identification: string
    phone_number: number
    email: string
    createdAt?: Date
    updatedAt?: Date
}

export interface PatientReq {
    first_name: string
    last_name: string
    identification: string
    phone_number: number
    email: string
}