import { redirect } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';

export function load({ cookies }) {
  const access_token = cookies.get('access_token');

  if (access_token) {
    return { loggedIn: true };
  } else {
    //TODO: Once refresh method is implemented server-side, check for refresh token here and refresh authorization if possible.
    throw redirect(307, '/');
  }
}
