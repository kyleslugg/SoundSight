import type { Request, Response } from 'express';
import { Router } from 'express';
import AuthController from '../controllers/authController.js';

const AuthenticationRouter = Router();

AuthenticationRouter.get('/login', AuthController.initiateOauthLogin);

AuthenticationRouter.get(
  '/callback',
  AuthController.handleCallback,
  (req: Request, res: Response) => {
    return res.redirect('/app');
  }
);

AuthenticationRouter.get('/logout', AuthController.logout, (req, res) => {
  return res.redirect('/');
});

export default AuthenticationRouter;
