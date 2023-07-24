import express, { Request, Response, Errback, NextFunction } from 'express';
import SpotifyRouter from './routes/spotifyRouter.ts';
import { configDotenv } from 'dotenv';
import setSession from './utilities/setSession.ts';
import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

configDotenv();
setSession();

const PORT = 3000;
const app = express();

app.use('/spotify', SpotifyRouter);

app.use(express.static(url.resolve(__dirname, '../assets')));

app.get('/home', (req, res) => {
  res.sendFile(url.resolve(__dirname, '../../index.html'));
});

// Catch-all error handler

app.use('*', (req: Request, res: Response) => {
  return res.status(404).send("This is not the page you're looking for...");
});

// Global error handling middleware

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
