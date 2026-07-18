import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import {
  createVehicle, getAllVehicles, searchVehicles,
  updateVehicle, deleteVehicle, purchaseVehicle, restockVehicle,
} from '../controllers/vehicle.controller.js';

const router = Router();

router.use(authenticate); // everything below requires a valid token

router.get('/search', searchVehicles);   // must come before /:id-style routes
router.get('/', getAllVehicles);
router.post('/', createVehicle);
router.put('/:id', updateVehicle);
router.delete('/:id', requireAdmin, deleteVehicle);

router.post('/:id/purchase', purchaseVehicle);
router.post('/:id/restock', requireAdmin, restockVehicle);

export default router;