import { Router } from 'express';
import AuthController from '../controllers/authController.ts';

const AuthenticationRouter = Router();

AuthenticationRouter.get('/login', AuthController.initiateOauthLogin);

AuthenticationRouter.get(
  '/callback',
  AuthController.handleCallback,
  (req, res) => {
    res.redirect('/');
  }
);

AuthenticationRouter.get(
  '/refresh',
  AuthController.refreshToken,
  (req, res) => {
    res.redirect('/');
  }
);

AuthenticationRouter.get('/logout', AuthController.logout, (req, res) => {
  res.status(200).redirect('/');
});

export default AuthenticationRouter;
