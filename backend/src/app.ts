import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import statusRoutes from './routes/status.route.js';

const app = express();

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use('/', statusRoutes);

export default app;