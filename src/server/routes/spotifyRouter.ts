import { Router } from 'express';
import SpotifyController from '../controllers/spotifyController.ts';
import AuthController from '../controllers/authController.ts';

const SpotifyRouter = Router();

SpotifyRouter.get(
  '/top/:type',
  AuthController.checkAuth,
  SpotifyController.getTop,
  (req, res) => {
    return res.status(200).json(res.locals.tops);
  }
);

SpotifyRouter.get(
  '/user',
  AuthController.checkAuth,
  SpotifyController.getUserInfo,
  (req, res) => {
    return res.status(200).json(res.locals.response);
  }
);

export default SpotifyRouter;
