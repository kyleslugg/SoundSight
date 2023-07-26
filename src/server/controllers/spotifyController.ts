import { MiddlewareController, MiddlewareErrorCreator } from '../../types';
import { processTopResponse } from '../utilities/responseProcessors.ts';

const createError = (err: MiddlewareErrorCreator) => {
  const thisMessage = err.message ? err.message : err.log;
  return {
    log: `Encountered error in spotifyController.${err.method}: ${err.log}`,
    status: err.status,
    message: { err: thisMessage }
  };
};

const SpotifyController: MiddlewareController = {};

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

export default SpotifyController;
