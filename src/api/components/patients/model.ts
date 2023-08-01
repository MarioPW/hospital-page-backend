export interface Patient {
    id_paciente: number
    nombre: string
    apellido: string
    identificacion: string
    telefono: number
    createdAt?: Date
    updatedAt?: Date
}

export interface PatientReq {
    name: string
    lastName: string
    identification: string
    phone: number
    email: string
}