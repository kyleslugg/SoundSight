import qs from 'node:querystring';
import type { MiddlewareController, MiddlewareErrorCreator } from '../../types';
import { generateRandomString } from '../utilities/utils.js';

const STATE_KEY = 'spotify_state';
const scope =
  'user-read-private user-read-email user-top-read user-read-recently-played user-library-read playlist-read-private playlist-read-collaborative';

const createError = (err: MiddlewareErrorCreator) => {
  const thisMessage = err.message ? err.message : err.log;
  return {
    log: `Encountered error in spotifyController.${err.method}: ${err.log}`,
    status: err.status,
    message: { err: thisMessage }
  };
};

const AuthController: MiddlewareController = {};

/**
 * Initiates the OAuth login process for Spotify by redirecting the user to the Spotify authorization page.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns A redirect response to the Spotify authorization page.
 */
AuthController.initiateOauthLogin = (req, res, next) => {
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

  // Set random key from which token will be seeded
  const state = generateRandomString(16);
  res.cookie(STATE_KEY, state);

  return res.redirect(
    'https://accounts.spotify.com/authorize?' +
      qs.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state
      })
  );
};

/**
 * Handles the callback path for Spotify authentication.
 * Verifies the state, exchanges the authorization code for an access token and a refresh token,
 * and sets cookies for the tokens.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
AuthController.handleCallback = (req, res, next) => {
  console.log('Reached callback path...');
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;
  console.log(req.cookies);
  console.log(`Code: ${code}\nState: ${state}\nStoredState: ${storedState}`);

  if (!state || state !== storedState) {
    return next(
      createError({
        method: 'handleCallback',
        log: 'State mismatch during authentication',
        status: 500
      })
    );
  }

  res.clearCookie(STATE_KEY);

  const authBody = {
    code: code,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code'
  };

  const authHeaders = {
    Authorization:
      'Basic ' +
      Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: authHeaders,
    //@ts-ignore
    body: qs.stringify(authBody)
  })
    .then((result) => result.json())
    .then((result) => {
      res.cookie('access_token', result.access_token, {
        maxAge: result.expires_in * 999
      });
      res.cookie('refresh_token', result.refresh_token);
      return next();
    })
    .catch((err) => {
      return next(
        createError({
          method: 'handleCallback',
          log: `Encountered error while requesting authorization token: ${err}`,
          status: 500,
          message: 'Something went wrong. Unable to authenticate.'
        })
      );
    });
};

/**
 * Middleware function to check if the user is authorized to access the Spotify API.
 * If the user has an access token, the function proceeds to the next middleware.
 * If the user has a refresh token, the function refreshes the access token and sets it as a cookie.
 * If the user has neither token, the function redirects the user to the previous page with a 403 status code.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
AuthController.checkAuth = (req, res, next) => {
  const { access_token, refresh_token } = req.cookies;
  const { CLIENT_ID, CLIENT_SECRET } = process.env;

  if (access_token) return next();
  else if (refresh_token) {
    const refreshBody = {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    };
    const refreshHeaders = {
      Authorization:
        'Basic ' +
        Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: refreshHeaders,
      body: qs.stringify(refreshBody)
    })
      .then((resp) => resp.json())
      .then((result) => {
        res.cookie('access_token', result.access_token, {
          maxAge: result.expires_in * 999
        });
        req.cookies['access_token'] = result.access_token;

        return next();
      })
      .catch((err) => {
        return next(
          createError({
            method: 'refreshToken',
            log: `Encountered error while refreshing authorization token: ${err}`,
            status: 500,
            message: 'Something went wrong. Unable to authenticate.'
          })
        );
      });
  } else {
    res.status(403).redirect('back');
  }
};

/**
 * Clears the access_token, refresh_token, and state_key cookies from the response object.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
AuthController.logout = (req, res, next) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  res.clearCookie(STATE_KEY);
  return next();
};

export default AuthController;
