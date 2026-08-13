import express from 'express';
import multer from 'multer';
import path from 'path';
import { verifyToken } from '../middleware/auth.js';
import {
  getPlaybooks,
  getPlaybookById,
  createPlaybook,
  updatePlaybook,
  deletePlaybook,
  getAllTags,
} from '../controllers/playbookController.js';

const router = express.Router();

// Multer setup for file uploads (PDF and Video)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/playbooks/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'playbook-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'application/pdf',
    'video/mp4',
    'video/mpeg',
    'video/quicktime',
    'video/x-msvideo',
    'video/webm',
  ];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and video files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
});

const checkEditPermission = (req, res, next) => {
  const user = req.user;
  if (!['ADMIN', 'EDITOR'].includes(user?.role)) {
    return res.status(403).json({ success: false, error: 'Unauthorized' });
  }
  next();
};

// Routes
router.get('/', verifyToken, getPlaybooks);
router.get('/tags/all', verifyToken, getAllTags);
router.get('/:id', verifyToken, getPlaybookById);
router.post('/', verifyToken, checkEditPermission, upload.single('file'), createPlaybook);
router.put('/:id', verifyToken, checkEditPermission, upload.single('file'), updatePlaybook);
router.delete('/:id', verifyToken, checkEditPermission, deletePlaybook);

export default router;
