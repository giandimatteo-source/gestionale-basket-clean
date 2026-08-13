import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getPlayerStats,
  createPlayerStat,
  updatePlayerStat,
  deletePlayerStat,
  getOffensiveBreakdown,
  createOffensiveBreakdown,
  updateOffensiveBreakdown,
  deleteOffensiveBreakdown,
  getComparingStats,
  createComparingStat,
  updateComparingStat,
  deleteComparingStat,
  getKeyPoints,
  createKeyPoint,
  updateKeyPoint,
  deleteKeyPoint,
} from '../controllers/scoutingSectionsController.js';

const router = express.Router();

const checkEditPermission = (req, res, next) => {
  const user = req.user;
  if (!['ADMIN', 'EDITOR'].includes(user?.role)) {
    return res.status(403).json({ success: false, error: 'Unauthorized' });
  }
  next();
};

// Player Stats routes
router.get('/player-stats', verifyToken, getPlayerStats);
router.post('/player-stats', verifyToken, checkEditPermission, createPlayerStat);
router.put('/player-stats/:id', verifyToken, checkEditPermission, updatePlayerStat);
router.delete('/player-stats/:id', verifyToken, checkEditPermission, deletePlayerStat);

// Offensive Breakdown routes
router.get('/offensive-breakdown', verifyToken, getOffensiveBreakdown);
router.post('/offensive-breakdown', verifyToken, checkEditPermission, createOffensiveBreakdown);
router.put('/offensive-breakdown/:id', verifyToken, checkEditPermission, updateOffensiveBreakdown);
router.delete('/offensive-breakdown/:id', verifyToken, checkEditPermission, deleteOffensiveBreakdown);

// Comparing Stats routes
router.get('/comparing-stats', verifyToken, getComparingStats);
router.post('/comparing-stats', verifyToken, checkEditPermission, createComparingStat);
router.put('/comparing-stats/:id', verifyToken, checkEditPermission, updateComparingStat);
router.delete('/comparing-stats/:id', verifyToken, checkEditPermission, deleteComparingStat);

// Key Points routes
router.get('/key-points', verifyToken, getKeyPoints);
router.post('/key-points', verifyToken, checkEditPermission, createKeyPoint);
router.put('/key-points/:id', verifyToken, checkEditPermission, updateKeyPoint);
router.delete('/key-points/:id', verifyToken, checkEditPermission, deleteKeyPoint);

export default router;
