import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';


export const handleInputErrors = (req : Request,res : Response, next : NextFunction) => {
    //Manejar errores
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({
            success: false,
            error : errors.array()[0].msg
        })
        return
    }
    next()
}