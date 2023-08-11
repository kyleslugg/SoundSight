import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
  const access_token = cookies.get('access_token');
  if (!access_token) {
    return null;
  } else {
    throw redirect(307, '/app');
  }
}
