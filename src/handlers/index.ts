import type { Request, Response } from "express";
import {validationResult} from 'express-validator'
import slug from 'slug'
import User from "../models/User";
import {hashPassword} from '../utils/auth'

export const createAccount = async (req : Request, res : Response) => {
    
    //Manejar errores
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            error : errors.array()[0].msg
        });
    }
    
    const {email, password} = req.body

    //Buscar si el correo ya esta usado
    const mailExist = await User.findOne({email})
    if(mailExist){
        //Error Response
        const error = new Error('Un usuario con ese mail ya esta registrado')
        return res.status(409).json({
            success: false,
            error : error.message
        });
    }

    const handle = slug(req.body.handle, '')
    const handleExist = await User.findOne({handle})

    if(handleExist){
        //Error Response
        const error = new Error('El handle ya esta en uso')
        return res.status(409).json({
            success: false,
            error : error.message
        });
    }

    //Success Response
    const user = new User(req.body)
    //hash(password) y slug(handle)
    user.password = await hashPassword(password)    
    user.handle = handle
    //Insertar usuario en DB
    await user.save()
    return res.status(201).json({
        success: true,
        message: 'Operación realizada con éxito',
    });   
    
}