import {Router} from 'express'
import {createAccount} from './handlers'

const router = Router();

// Autenticacion y registro
router.post('/auth/register', (req,res) =>{
    createAccount(req,res)
})


export default router;