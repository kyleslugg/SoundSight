import type { MiddlewareController, MiddlewareErrorCreator } from '../../types';
import {
  processTracksResponse,
  processArtistsResponse,
  processPlaylistsResponse,
  processPlaylistDetailResponse
} from '../utilities/responseProcessors.js';

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
      if (type === 'tracks') {
        processTracksResponse(resp, access_token).then((resp) => {
          res.locals.tracks = resp;
          return next();
        });
      } else {
        processArtistsResponse(resp).then((resp) => {
          res.locals.artists = resp;
          return next();
        });
      }
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
  const { access_token } = req.cookies;

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
  fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  })
    .then((resp) => processPlaylistsResponse(resp, access_token))
    .then((resp) => {
      // Store processed playlist data in response object
      res.locals.playlistData = resp;
      return next();
    });
};

/**
 * Fetches the details of a Spotify playlist using the playlist ID and access token provided in the request.
 * Processes the response and returns the track details of the playlist.
 *
 * @param req - The request object containing the playlist ID and access token.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns The track details of the playlist.
 */
SpotifyController.getPlaylistDetails = (req, res, next) => {
  const { playlistId } = req.params;
  const { access_token } = req.cookies;

  if (!playlistId) {
    return next(
      createError({
        method: 'getPlaylistDetails',
        log: 'No Playlist ID provided. Cannot fetch details.',
        status: 400
      })
    );
  }

  fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    }
  }).then((resp) => processPlaylistDetailResponse(resp, access_token));
};

export default SpotifyController;
