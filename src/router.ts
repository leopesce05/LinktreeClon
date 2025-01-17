import {Router} from 'express'
import { body, validationResult } from 'express-validator';
import {createAccount} from './handlers'

const router = Router();

// Autenticacion y registro
router.post('/auth/register', 
    [
        // Agregar las validaciones como middleware
        body('handle').notEmpty().withMessage('El campo handle es obligatorio'),
        body('email').isEmail().withMessage('Debe ser un email válido'),
        body('name').notEmpty().withMessage('Debe ser un email válido'),
        body('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    ]
    ,async (req,res) =>{
        //Manejar errores
        let errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                error : errors.array()[0].msg
            });
        }
        createAccount(req,res)
    })


export default router;