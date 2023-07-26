import { Doctor } from './model'
import { Request, Response } from 'express'
import { DoctorService } from './service'
import logger from '../../../utils/logger'
import { CustomError } from '../../../utils/customErrors'
import { createDoctorSchema } from './validations/doctor.validations'


export interface DoctorController {
    getAllDoctors(req: Request, res: Response): void
    createDoctor(req: Request, res: Response): void  
    getDoctorById(req: Request, res: Response): void 
    updateDoctor(req: Request, res: Response): void   
    deleteDoctor(req: Request, res: Response): void  
}

export class DoctorControllerImpl implements DoctorController {
    private  doctorService:  DoctorService
    
    constructor ( doctorService: DoctorService ){
        this.doctorService = doctorService
    }
    public  async getAllDoctors(req: Request, res: Response): Promise<void> {
        try {
            const doctors = await this.doctorService.getAllDoctors()
            res.status(200).json(doctors)
            
        } catch (error) {
            res.status(400).json({message: "Error getting all doctors"})
        }
    }

    public createDoctor (req: Request, res: Response): void {
    
        const { error, value } = createDoctorSchema.validate(req.body)

        if (error){
            res.status(400).json({message: error.details[0].message})
        } else {
            this.doctorService.createDoctor(value)
            .then(
                (doctor) => {
                    res.status(201).json(doctor)
                    
                },
                (error) => {
                    logger.error(error)
                    if (error instanceof CustomError){
                        res.status(400).json({
                            error_name: error.name,
                            message: "Failed Creating a doctor"
                        })
                    } else {
                        res.status(400).json({
                            message: "Internal Server Error"
                        })
                    }
                }
            )
        }
    }

    public async getDoctorById (req: Request, res: Response): Promise<void> {
        try{
            const id = parseInt(req.params.id)
            const doctor =  await this.doctorService.getDoctorById(id)
            if (doctor) {
                res.status(200).json(doctor)
            } else {
                throw new CustomError ('RecordNotFoundError', 'Record has not found yet', 'doctores') 
            }
        } catch (error) {
            logger.error(error)
            if (error instanceof CustomError){
                res.status(400).json({error: error.message})
            } else {
                res.status(400).json({error: "Failed to retrieve doctor"})
            }
        }
    }

    public async updateDoctor (req: Request, res: Response): Promise<void> {
        try{
            const id = parseInt(req.params.id)
            const doctorReq = req.body
            const doctor =  await this.doctorService.updateDoctor(id, doctorReq)
            if (doctor) {
                res.status(200).json(doctor)
            } else {
                throw new CustomError ('UpdateError', 'Failed updating doctor in controller', 'doctores')
            }
        } catch (error) {
            logger.error(error)
            if (error instanceof CustomError){
                res.status(400).json({error: error.message})
            } else {
                res.status(400).json({error: "Failed to update doctor"})
            }
        }
    }

    public async deleteDoctor (req: Request, res: Response): Promise<void> {
        try{
            const id = parseInt(req.params.id_doctor )
            await this.doctorService.deleteDoctor(id)       
            res.status(200).json({message: `Doctor was deleted successfully`})
        } catch (error) {
            logger.error(error)
            if (error instanceof CustomError){
                res.status(400).json({error: error.message})
            } else {
                res.status(400).json({error: "Failed to delete doctor"})
            }
        }
    }
}