import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

connectDB().then(() => {
  app.listen(env.port, () => {
    console.log('[APP] Dealership Inventory System started working.');
    console.log(`[LIVE] App is running on ${env.domain}:${env.port}`);
    console.log('\n\n');
  });
});