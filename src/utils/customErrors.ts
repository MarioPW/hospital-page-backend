
type ErrorType =
    'RecordNotFoundError' |
    'CreationError' |
    'UpdateError' |
    'DeleteError' |
    'GetAllError'

type ComponentName = 
    'doctors' |
    'appointments' |
    'patients'

export class CustomError extends Error {
    constructor(errorType: ErrorType, message: string, componentName: ComponentName ){
        super(message)
        this.name = `${componentName} ${errorType}`
    }
}
