import { Request, Response, Router } from 'express';
import AuthController from '../controllers/authController.ts';

const AuthenticationRouter = Router();

AuthenticationRouter.get('/login', AuthController.initiateOauthLogin);

AuthenticationRouter.get(
  '/callback',
  AuthController.handleCallback,
  (req: Request, res: Response) => {
    return res.redirect('back');
  }
);

AuthenticationRouter.get('/logout', AuthController.logout, (req, res) => {
  return res.redirect('back');
});

export default AuthenticationRouter;
