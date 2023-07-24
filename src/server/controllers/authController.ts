import { env } from 'node:process';
import qs from 'node:querystring';
import { MiddlewareController, MiddlewareErrorCreator } from '../../types';
import { generateRandomString } from '../utilities/utils';

const STATE_KEY = 'spotify_state';
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = env;

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
  //Set random key from which token will be seeded
  const state = generateRandomString(16);
  res.cookie(STATE_KEY, state);

  const scope = 'user-read-private user-read-email';

  res.redirect(
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
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;

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
    body: qs.stringify(authBody)
  });
};

export default AuthController;
