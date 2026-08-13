import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getShootingStats,
  createShootingStats,
  updateShootingStats,
  deleteShootingStats,
} from '../controllers/shootingStatsController.js';

const router = express.Router();

const checkEditPermission = (req, res, next) => {
  const user = req.user;
  if (!['ADMIN', 'EDITOR', 'COACH'].includes(user?.role)) {
    return res.status(403).json({ success: false, error: 'Unauthorized' });
  }
  next();
};

router.get('/', verifyToken, getShootingStats);
router.post('/', verifyToken, checkEditPermission, createShootingStats);
router.put('/:id', verifyToken, checkEditPermission, updateShootingStats);
router.delete('/:id', verifyToken, checkEditPermission, deleteShootingStats);

export default router;
