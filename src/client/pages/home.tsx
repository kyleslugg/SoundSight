import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
export default function Home() {
  const getTop = (type: 'tracks' | 'artists') => {
    fetch('/spotify/top/' + type, {}).then((resp) => console.dir(resp));
  };

  const handleLogout = () => {
    fetch('/auth/logout').then((res) => {
      if (res.ok) {
        return;
      } else {
        return Error('Unable to log out.');
      }
    });
  };

  useEffect(() => {
    //getTop('tracks');
  }, []);

  return (
    <div>
      <h1>Welcome, </h1>
      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  );
}
