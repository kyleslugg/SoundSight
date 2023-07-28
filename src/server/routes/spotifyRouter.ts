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
    if (req.params.type === 'tracks') {
      return res.status(200).json(res.locals.tracks);
    } else {
      return res.status(200).json(res.locals.artists);
    }
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

SpotifyRouter.get(
  '/playlists/tracks/:playlistId',
  AuthController.checkAuth,
  SpotifyController.getPlaylistDetails,
  (req, res) => {
    return res.locals.tracks;
  }
);

export default SpotifyRouter;
