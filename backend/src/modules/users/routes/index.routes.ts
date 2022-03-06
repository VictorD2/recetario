import { Router } from "express";
import passport from 'passport';

import { whoAmI, publico, signIn, signUp } from "../controllers/index.controllers";

const router = Router();
router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/public', publico);
router.post('/whoAmI', passport.authenticate('jwt', { session: false }), whoAmI);

export default router;
