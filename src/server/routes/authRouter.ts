import { Router } from 'express';
import AuthController from '../controllers/authController.ts';

const AuthenticationRouter = Router();

AuthenticationRouter.get(
  '/login',
  AuthController.initiateOauthLogin,
  (req, res) => {
    res.sendStatus(300);
  }
);

AuthenticationRouter.get(
  '/callback',
  AuthController.handleCallback,
  (req, res) => {
    const { AUTH_TOKEN, REFRESH_TOKEN } = process.env;
    res
      .status(200)
      .json({ app_token: AUTH_TOKEN, refresh_token: REFRESH_TOKEN });
  }
);

export default AuthenticationRouter;
