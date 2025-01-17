import User, { IUser } from "../models/User";


export const createAccount = async (req, res) => {
    const user = new User<IUser>(req.body)
    try{
        await user.save()
        res.status(200).json({
            success: true,
            message: 'Operación realizada con éxito',
        });
    }catch(e){
        res.status(400).json({
            success: true,
            message: e.message,
        });
    }
}