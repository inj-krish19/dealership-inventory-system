import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    name: 'AutoLot API',
    description: 'Car Dealership Inventory System — REST API for managing vehicle inventory, authentication, and role-based purchase/restock operations.',
    version: '1.0.0',
    docs: '/api',
  });
});

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;