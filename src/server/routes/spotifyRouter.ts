import { Router } from 'express';
import SpotifyController from '../controllers/spotifyController.ts';

const SpotifyRouter = Router();

SpotifyRouter.get('/top/:type', SpotifyController.getTop, (req, res) => {
  res.status(200).json(JSON.stringify(res.locals.token));
});

export default SpotifyRouter;
