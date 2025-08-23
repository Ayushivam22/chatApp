import { Router } from "express";
import { signin, signout, signup, updateUser } from "../controllers/controllers";
import { auth } from "../middlewares/auth.middleware";
const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);

router.put('/update-user', auth, updateUser)


export default router