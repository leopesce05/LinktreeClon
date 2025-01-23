import { getUser, updateProfile, uploadImage } from './handlers/index';
import {Router, Request, Response} from 'express'
import { body } from 'express-validator';

import {createAccount, login} from './handlers'
import { handleInputErrors } from './middleware/validation';
import { authenticate } from './middleware/auth';

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

router.get('/user',
    authenticate,
    getUser)

router.patch('/user',
    [
    body('handle').notEmpty().withMessage('El handle no puede ir vacio'),
    body('description').notEmpty().withMessage('La descripcion no puede ir vacia')
    ],
    handleInputErrors,
    authenticate,
    updateProfile)

router.post('/user/image',
    authenticate,
    uploadImage
)



export default router;