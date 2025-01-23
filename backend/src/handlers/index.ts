import type { Request, Response } from "express";
import slug from 'slug'
import User from "../models/User";
import formidable from 'formidable'

import {hashPassword, comparePassword} from '../utils/auth'
import { generateJWT } from "../utils/jwt";
import cloudinary from "../config/cloudinary";

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

    //Generar JWT para validacion
    const token = generateJWT({id: user._id})

    //Autenticacion exitosa
    res.status(200).send(token);
    return
}


export const getUser = async (req : Request, res : Response) => {

    res.status(200).json(req.user)

}


export const updateProfile = async (req : Request, res : Response) => {
    try {
        const {description, handle} = req.body
        const slugHandle = slug(handle, '')
        const handleExist = await User.findOne({handle: slugHandle})
    
        if(handleExist && handleExist.email!==req.user.email){
            //Error Response
            const error = new Error('Nombre de usuario no disponible')
            res.status(409).json({
                success: false,
                error : error.message
            });
            return
        }

        const user = req.user
        user.description = description
        user.handle = slugHandle
        await user.save()
        res.status(200).json(user)

    } catch (e) {
        const error = new Error('Error al actualizar el perfil')
        res.status(500).json({ error: error.message })
    }
}

export const uploadImage = async (req : Request, res : Response) => {
    const form = formidable({multiples:false})

    try {
        form.parse(req, (err, fields, files) => {

            cloudinary.uploader.upload(files.file[0].filepath, {}, async (error, result) => {
                console.log(error)
                console.log(result)
            })
        })
    } catch (e) {
        const error = new Error('Error al subir la imagen')
        res.status(500).json({ error: error.message })
    }
}