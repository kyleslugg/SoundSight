import qs from 'node:querystring';
import { MiddlewareController, MiddlewareErrorCreator } from '../../types';
import { generateRandomString } from '../utilities/utils.ts';

const STATE_KEY = 'spotify_state';
const scope =
  'user-read-private user-read-email user-top-read user-read-recently-played user-library-read';

const createError = (err: MiddlewareErrorCreator) => {
  const thisMessage = err.message ? err.message : err.log;
  return {
    log: `Encountered error in spotifyController.${err.method}: ${err.log}`,
    status: err.status,
    message: { err: thisMessage }
  };
};

const AuthController: MiddlewareController = {};

AuthController.initiateOauthLogin = (req, res, next) => {
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

  //Set random key from which token will be seeded
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
      res.cookie('access_token', result.access_token);
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

AuthController.refreshToken = (req, res, next) => {
  const { CLIENT_ID, CLIENT_SECRET } = process.env;
  const { REFRESH_TOKEN } = req.cookies;

  const refreshBody = {
    grant_type: 'refresh_token',
    refresh_token: REFRESH_TOKEN
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
      res.cookie('access_token', result.access_token);
      res.cookie('refresh_token', result.refresh_token);
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
};

AuthController.checkAuth = (req, res, next) => {
  const { access_token } = req.cookies;

  if (!access_token) {
    res.clearCookie(STATE_KEY);
    res.clearCookie('refresh_token');
    res.status(403).redirect('/');
  }
};

AuthController.logout = (req, res, next) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  res.clearCookie(STATE_KEY);
  return next();
};

export default AuthController;
