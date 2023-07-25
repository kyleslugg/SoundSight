import { Card, Button } from '@mui/material';

export default function Login() {
  const handleOauth = () => {
    fetch('/auth/login', { mode: 'no-cors' })
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
      <Button className="spotify-button" onClick={handleOauth}></Button>
    </Card>
  );
}
