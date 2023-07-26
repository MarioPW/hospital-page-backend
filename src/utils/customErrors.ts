// class DoctorGetAllError extends Error {
//     constructor(){
//         super("Failed to retrieve doctor list")
//         this.name = "DoctorGetAllError"
//     }
// }

// class PatientGetAllError extends Error {
//     constructor(){
//         super("Failed to retrieve patient list")
//         this.name = "PatientGetAllError"
//     }
// }

// class DoctorCreationError extends Error {
//     constructor(message: string){
//         super(message)
//         this.name = "DoctorCreationError"
//     }
// }

type ErrorType =
    'RecordNotFoundError' |
    'CreationError' |
    'UpdateError' |
    'DeleteError' |
    'GetAllError'

type ComponentName = 
    'doctores' |
    'citas' |
    'pacientes'

export class CustomError extends Error {
    constructor(errorType: ErrorType, message: string, componentName: ComponentName ){
        super(message)
        this.name = `${componentName} ${errorType}`
    }
}
