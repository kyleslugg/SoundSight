import { env } from 'node:process';
import qs from 'node:querystring';

const generateRandomString = function (length: number) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export function getAuthToken(authCode: string) {
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = env;
  const reqBody = {
    grant_type: 'authorization_code'
  };

  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: qs.stringify(reqBody)
  })
    .then((result) => result.json())
    .then((result) => {
      env['AUTH_TOKEN'] = result.access_token;
    })
    .catch((err) => {
      return Error(
        `Encountered error while authenticating application: ${err}. Please check environment for API credentials.`
      );
    });
}
