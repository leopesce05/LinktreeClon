import {Router, Request, Response} from 'express'
import { body } from 'express-validator';
import {createAccount, login} from './handlers'
import { handleInputErrors } from './middleware/validation';

const router = Router();

// Autenticacion y registro
router.post('/auth/register', 
    // Agregar las validaciones como middleware
    body('handle').notEmpty().withMessage('El campo handle es obligatorio'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('name').notEmpty().withMessage('El nombre no debe estar vacio'),
    body('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    handleInputErrors,
    createAccount
)

router.post('/auth/login',
    [
        body('email').isEmail().withMessage('E-mail inválido'),
        body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    ],
    handleInputErrors,
    login
)

export default router;