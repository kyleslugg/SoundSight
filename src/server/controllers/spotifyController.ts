import { MiddlewareController, MiddlewareErrorCreator } from '../../types';
import {
  processTopResponse,
  processPlaylistResponse
} from '../utilities/responseProcessors.ts';

const createError = (err: MiddlewareErrorCreator) => {
  const thisMessage = err.message ? err.message : err.log;
  return {
    log: `Encountered error in spotifyController.${err.method}: ${err.log}`,
    status: err.status,
    message: { err: thisMessage }
  };
};

const SpotifyController: MiddlewareController = {};

/**
 * Fetches user information from the Spotify API using the access token provided in the request cookies.
 * The fetched user information is stored as a local variable in the response object and passed to the next middleware function.
 * If an error occurs during the fetch request, an error object is created and passed to the next middleware function.
 *
 * @param req - The request object containing the cookies with the access token.
 * @param res - The response object to be modified with the fetched user information.
 * @param next - The next middleware function to be called after processing the response.
 */
SpotifyController.getUserInfo = (req, res, next) => {
  const { access_token } = req.cookies;
  fetch('https://api.spotify.com/v1/me/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
      res.locals.response = resp;
      return next();
    })
    .catch((e) => {
      return next(
        createError({
          method: 'getUserInfo',
          log: `${e}`,
          status: 500,
          message: 'Encountered error while fetching user information'
        })
      );
    });
};

/**
 * Retrieves the user's top tracks or artists from the Spotify API, processes the response, and stores the result in the response object for the next middleware to use.
 *
 * @param req - The request object containing the type parameter and access token cookie.
 * @param res - The response object to store the processed top tracks or artists.
 * @param next - The next middleware function to call.
 */
SpotifyController.getTop = (req, res, next) => {
  const { type } = req.params;
  if (!type || (type !== 'artists' && type !== 'tracks')) {
    return next(
      createError({
        method: 'getTop',
        log: 'Incorrect or missing type parameter. Please direct request to /top/artists or /top/tracks.',
        status: 400
      })
    );
  }

  const { access_token } = req.cookies;

  fetch(`https://api.spotify.com/v1/me/top/${type}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  })
    //.then((resp) => resp.json())
    .then((resp) => {
      processTopResponse(resp, type).then((resp) => {
        res.locals.tops = resp;
        return next();
      });
    });
};

/**
 * Fetches and processes the playlists of a given user from the Spotify API.
 * The processed playlist data is stored in the response object for the next middleware to use.
 *
 * @param req - The request object containing the user ID in the params.
 * @param res - The response object to store the processed playlist data.
 * @param next - The next middleware function to call.
 */
SpotifyController.getUserPlaylists = (req, res, next) => {
  const { userId } = req.params;

  // Check if user ID is provided
  if (!userId) {
    return next(
      createError({
        method: 'getUserPlaylists',
        log: 'No User ID provided. Cannot fetch playlists.',
        status: 400
      })
    );
  }

  // Fetch user's playlists from Spotify API
  fetch(`https://api.spotify.com/v1/users/${userId}/playlists`)
    .then((resp) => processPlaylistResponse(resp))
    .then((resp) => {
      // Store processed playlist data in response object
      res.locals.playlistData = resp;
      return next();
    });
};

export default SpotifyController;
