// import { sequence } from '@sveltejs/kit/hooks';

//Prepares UI styles server-side
import { prepareStylesSSR } from '@svelteuidev/core';

// //Handles OAuth flow
// import { SvelteKitAuth, type SvelteKitAuthConfig } from '@auth/sveltekit';
// import SpotifyProvider from '@auth/core/providers/spotify';
// import type { Provider } from '@auth/core/providers';
// import type { Handle } from '@sveltejs/kit';
// import { configDotenv } from 'dotenv';
// configDotenv();

// const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

// const config: SvelteKitAuthConfig = {
//   providers: [
//     SpotifyProvider({
//       id: '',
//       name: 'Auth0',
//       clientId: CLIENT_ID,
//       clientSecret: CLIENT_SECRET,
//       issuer: 'https://dev-****.auth0.com/', // <- remember to add trailing `/`
//       wellKnown: 'https://dev-****.auth0.com/.well-known/openid-configuration'
//     }) as Provider
//   ],
//   secret: '-any-random-string-',
//   debug: true,
//   session: {
//     maxAge: 1800 // 30 mins
//   }
// };

export const handle = prepareStylesSSR;
