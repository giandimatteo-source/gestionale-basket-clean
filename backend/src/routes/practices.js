import express from 'express';
import multer from 'multer';
import path from 'path';
import { verifyToken } from '../middleware/auth.js';
import {
  getTrainingSessions,
  getTrainingSessionById,
  createTrainingSession,
  updateTrainingSession,
  deleteTrainingSession,
  uploadTrainingVideo,
} from '../controllers/practicesController.js';

const router = express.Router();

// Multer setup for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/trainings/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'training-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Allow video files
  const allowedMimes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only video files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
});

// Middleware for role-based access
const checkEditPermission = (req, res, next) => {
  const user = req.user;
  if (!['ADMIN', 'EDITOR'].includes(user?.role)) {
    return res.status(403).json({ success: false, error: 'Unauthorized' });
  }
  next();
};

// Routes
router.get('/', verifyToken, getTrainingSessions);
router.get('/:id', verifyToken, getTrainingSessionById);
router.post('/', verifyToken, checkEditPermission, upload.single('video'), createTrainingSession);
router.put('/:id', verifyToken, checkEditPermission, upload.single('video'), updateTrainingSession);
router.delete('/:id', verifyToken, checkEditPermission, deleteTrainingSession);
router.post('/upload/video', verifyToken, checkEditPermission, upload.single('video'), uploadTrainingVideo);

export default router;
