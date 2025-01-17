import {Router} from 'express';
import User,{IUser} from './models/User';

const router = Router();

// Autenticacion y registro
router.post('/auth/register', async (req, res) => {
    console.log(req.body)
    await User.create<IUser>(req.body);
    return;
})


export default router;