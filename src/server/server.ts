import express, { Request, Response, Errback, NextFunction } from 'express';
import ViteExpress from 'vite-express';
import SpotifyRouter from './routes/spotifyRouter.ts';
import { configDotenv } from 'dotenv';
import * as url from 'url';
import AuthenticationRouter from './routes/authRouter.ts';

configDotenv();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const PORT = 3000;
export const app = express();

// if (!process.env['VITE']) {
//   const frontendFiles = process.cwd() + '/dist'
//   app.use(express.static(frontendFiles))
//   app.get('/*', (_, res) => {
//     res.send(frontendFiles + '/index.html')
//   })
//   app.listen(process.env['PORT'])
// }

app.use('/spotify', SpotifyRouter);

app.use('/auth', AuthenticationRouter);

app.use(ViteExpress.static());

app.use(express.static(url.resolve(__dirname, '../assets')));

// app.get('/*', (req, res) => {
//   res.render(url.resolve(__dirname, '../../views/index.html.ejs'));
// });

// // Catch-all error handler
// app.use('*', (req: Request, res: Response) => {
//   return res.status(404).send("This is not the page you're looking for...");
// });

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

// ViteExpress.listen(app, PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

export default app;
