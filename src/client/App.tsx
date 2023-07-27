import { Container, Card, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { KSUTheme } from './styles/MUITheme';

import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import './App.scss';
import Login from './pages/login';
import Home from './pages/home';

/**
 * Renders the 'Login' or 'Home' component based on the user's authorization status.
 * Checks for the presence of a refresh token in cookies to determine authorization.
 */
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
      {!authorized && <Login />}
      {authorized && <Home />}
    </ThemeProvider>
  );
}

export default App;
