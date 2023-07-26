import { Router } from 'express';
import SpotifyController from '../controllers/spotifyController.ts';

const SpotifyRouter = Router();

SpotifyRouter.get('/top/:type', SpotifyController.getTop, (req, res) => {
  return res.status(200).json(res.locals.tops);
});

SpotifyRouter.get('/user', SpotifyController.getUserInfo, (req, res) => {
  return res.status(200).json(res.locals.response);
});

export default SpotifyRouter;
