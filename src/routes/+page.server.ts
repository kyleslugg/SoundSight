import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
  const access_token = cookies.get('access_token');
  if (access_token) {
    throw redirect(307, '/app');
  } else {
    return { loggedIn: true };
  }
}
