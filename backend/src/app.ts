import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import statusRoutes from './routes/status.route.js';
import authRoutes from './routes/auth.route.js';
import vehicleRoutes from './routes/vehicle.routes.js';
import docsRoutes from './routes/docs.route.js';


const app = express();

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use('/', statusRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/docs', docsRoutes);

export default app;