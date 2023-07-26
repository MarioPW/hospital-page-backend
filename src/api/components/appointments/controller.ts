import { Appointment } from './model'
import { Request, Response } from 'express'
import { AppointmentService } from './service'
import logger from '../../../utils/logger'
import { CustomError } from '../../../utils/customErrors'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'


export interface AppointmentController {
    getAllAppointments(req: Request, res: Response): void
    createAppointment(req: Request, res: Response): void  
    getAppointmentById(req: Request, res: Response): void
    updateAppointment(req: Request, res: Response): void
    deleteAppointment(req: Request, res: Response): void 
}

export class AppointmentControllerImpl implements AppointmentController {
    private  appointmentService:  AppointmentService
    
    constructor ( appointmentService: AppointmentService ){
        this.appointmentService = appointmentService
    }
    public async getAllAppointments(req: Request, res: Response): Promise<void> {
        try {
            const patients = await this.appointmentService.getAllAppointments()
            
            res.status(200).json(patients)
            
        } catch (error) {
            logger.error(error)
            res.status(400).json({message: "Error getting all appointments"})
        }
    }
    public  createAppointment (req: Request, res: Response): void {
        const appointmentReq = req.body
        this.appointmentService.createAppointment(appointmentReq)
        .then(
            (appointment) =>{
                res.status(201).json(appointment)
            },
            (error) =>{
                logger.error(error)
                if (error instanceof CustomError){
                    res.status(400).json({
                        error_name: error.name,
                        message: "Failed Creating appointment"
                    })
                } else {
                    res.status(400).json({
                        message: "Internal Server Error"
                    })
                }
            }
        )

    }

    public async getAppointmentById (req: Request, res: Response): Promise<void> {
        try{

            const id = parseInt(req.params.id)
            if (isNaN(id)){
                throw new Error("Id must be a number") 
            }
            const appointment =  await this.appointmentService.getAppointmentById(id)
            if (appointment) {
                res.status(200).json(appointment)
            } else {
                throw new CustomError( 'RecordNotFoundError', 'Record has not found yet', 'citas')
            }
        } catch (error) {
            logger.error(error)
            if (error instanceof CustomError){
                res.status(400).json({error: error.message})
            } else {
                res.status(400).json({error: "Failed to retrieve appointment"})
            }
        }       
    }

    // Tarea: Terminar el crud de citas y pacientes -- Upadte Appoinment, Delete Appoinment --

    public async updateAppointment (req: Request, res: Response): Promise<void> {
        try{
            const id = parseInt(req.params.id)
            const appointmentReq = req.body
            const appointment =  await this.appointmentService.updateAppointment(id, appointmentReq)
            if (appointment) {
                res.status(200).json(appointment)
            } else {
                throw new CustomError ('UpdateError', 'Failed updating appointment in controller', 'citas')
            }
        } catch (error) {
            logger.error(error)
            if (error instanceof CustomError){
                res.status(400).json({error: error.message})
            } else {
                res.status(400).json({error: "Failed to update appointment"})
            }
        }
    }

    public async deleteAppointment(req: Request, res: Response): Promise<void> {
        try{
            const id = parseInt(req.params.id)
            await this.appointmentService.deleteAppointment(id)
            
            res.status(200).json({message: `Appointment was deleted successfully`})
        } catch (error) {
            logger.error(error)
            if (error instanceof CustomError){
                res.status(400).json({error: error.message})
            } else {
                res.status(400).json({error: "Failed to delete Appointment"})
            }
        }
    }

}