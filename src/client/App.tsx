import { Container, Card, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { KSUTheme } from './styles/MUITheme';

import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import './App.scss';
import Login from './pages/login';
import Home from './pages/home';

function App() {
  const [cookies, setCookies] = useCookies();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (cookies.refresh_token) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, [cookies]);

  return (
    <ThemeProvider theme={KSUTheme}>
      <Container maxWidth="small">
        {!authorized && <Login />}
        {authorized && <Home />}
      </Container>
    </ThemeProvider>
  );
}

export default App;
