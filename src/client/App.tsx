import { Container, Card, Button } from '@mui/material';

import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { exchangeToken } from './utils/authUtils';
import './App.scss';
import Login from './pages/login';
import Home from './pages/home';

function App() {
  const [cookies, setCookies] = useCookies();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (cookies.refresh_token) {
      exchangeToken();
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, []);

  return (
    <Container maxWidth="small">
      {!authorized && <Login />}
      {authorized && <Home />}
    </Container>
  );
}

export default App;
