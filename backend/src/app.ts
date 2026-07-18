import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const app = express();
app.use(cors());
app.use(express.json());

connectDB().then(() => {
  app.listen(env.port, () => {
    console.log("[APP] Dealership Inventory System started working.");
    console.log(`[LIVE] App is running on ${env.domain}:${env.port}`)
    console.log("\n\n");
  });
});