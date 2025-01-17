import {Router} from 'express'
import { body } from 'express-validator';
import {createAccount} from './handlers'

const router = Router();

// Autenticacion y registro
router.post('/auth/register', 
    [
        // Agregar las validaciones como middleware
        body('handle').notEmpty().withMessage('El campo handle es obligatorio'),
        body('email').isEmail().withMessage('Debe ser un email válido'),
        body('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    ]
    ,async (req,res) =>{
        await createAccount(req,res)
    })


export default router;