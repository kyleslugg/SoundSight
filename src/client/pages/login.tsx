import { Card, Button } from '@mui/material';

export default function Login() {
  const handleOauth = () => {
    fetch('/auth/login', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((resp) => {
        console.dir(resp);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Card>
      <h2>Login with Spotify</h2>
      <a href="/auth/login">
        <Button className="spotify-button"></Button>
      </a>
    </Card>
  );
}
