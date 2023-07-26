import { Request, Response, NextFunction } from "express"
import logger from "../utils/logger"

class CustomError extends Error {
    constructor (public statusCode: number, public message: string){
        super(message)
        this.name = 'CustomError'
    }
}

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err)
    if (err instanceof CustomError ) {
        res.status(err.statusCode).json({error: err.message})
    } else if  (err.message.includes("Unexpected token")){
        res.status(err.statusCode).json({error: "Body has bad struct"})
    } else {
        res.status(500).json({error: 'Internal Server Error'})
    }
}

export { errorHandlerMiddleware }