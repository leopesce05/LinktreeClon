import type { Request, Response } from "express";
import slug from 'slug'
import User from "../models/User";
import {hashPassword, comparePassword} from '../utils/auth'

export const createAccount = async (req : Request, res : Response) => {
    
    const {email, password} = req.body

    //Buscar si el correo ya esta usado
    const mailExist = await User.findOne({email})
    if (mailExist) {
        const error = new Error('Un usuario con ese mail ya esta registrado')
        res.status(409).json({ error: error.message })
        return
    }

    const handle = slug(req.body.handle, '')
    const handleExist = await User.findOne({handle})

    if(handleExist){
        //Error Response
        const error = new Error('El handle ya esta en uso')
        res.status(409).json({
            success: false,
            error : error.message
        });
        return
    }

    //Success Response
    const user = new User(req.body)
    //hash(password) y slug(handle)
    user.password = await hashPassword(password)    
    user.handle = handle
    //Insertar usuario en DB
    await user.save()
    res.status(201).json({
        success: true,
        message: 'Usuario creado con exito',
    });   
    return
}


export const login = async (req : Request, res : Response) => {

    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        //Error Response
        res.status(404).json({
            success: false,
            error : 'No existe un usuario con ese mail'
        });
        return
    }
    //Comparar password
    const validPassword = await comparePassword(password, user.password)
    if(!validPassword){
        //Error Response
        res.status(401).json({
            success: false,
            error : 'Contraseña incorrecta'
        });
        return
    }
    //Autenticacion exitosa
    res.status(200).json({
        success: true,
        message: 'Inicio de sesion exitoso',
        data: user
    });
    return
}