import { Router } from 'express';
import SpotifyController from '../controllers/spotifyController.ts';
import AuthController from '../controllers/authController.ts';

const SpotifyRouter = Router();

SpotifyRouter.get(
  '/user',
  AuthController.checkAuth,
  SpotifyController.getUserInfo,
  (req, res) => {
    return res.status(200).json(res.locals.response);
  }
);

SpotifyRouter.get(
  '/top/:type',
  AuthController.checkAuth,
  SpotifyController.getTop,
  (req, res) => {
    return res.status(200).json(res.locals.tops);
  }
);

SpotifyRouter.get(
  '/playlists/:userId',
  AuthController.checkAuth,
  SpotifyController.getUserPlaylists,
  (req, res) => {
    return res.status(200).json(res.locals.playlistData);
  }
);
export default SpotifyRouter;
