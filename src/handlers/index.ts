import User, { IUser } from "../models/User";
import { Request, Response } from "express";

export const createAccount = async (req : Request, res : Response) => {
    const {email} = req.body 
    const userExist = await User.findOne({email})
    if(userExist){
        const error = new Error('El usuario ya existe')
        return res.status(409).json({
            success: false,
            error : error.message
        });

    }else{
        const user = new User<IUser>(req.body)
        await user.save()
        return res.status(201).json({
            success: true,
            message: 'Operación realizada con éxito',
        });   
    }
}