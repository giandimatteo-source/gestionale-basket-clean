import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  addStaffNote,
  getStaffStats,
} from '../controllers/staffController.js';
import {
  importStaff,
  exportStaff,
} from '../controllers/excelController.js';
import { isCoach } from '../middleware/auth.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ============= MULTER CONFIGURATION =============
const uploadDir = path.join(__dirname, '../../uploads/staff');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, WebP allowed.'));
    }
  }
});

// ============= GET ROUTES =============
router.get('/', getAllStaff);
router.get('/stats', getStaffStats);
router.get('/:id', getStaffById);

// ============= CREATE ROUTES =============
router.post('/', isCoach, upload.single('photo'), createStaff);

// ============= UPDATE ROUTES =============
router.put('/:id', isCoach, upload.single('photo'), updateStaff);
router.post('/:id/notes', isCoach, addStaffNote);

// ============= DELETE ROUTES =============
router.delete('/:id', isCoach, deleteStaff);

// ============= IMPORT/EXPORT ROUTES =============
router.post('/import/excel', isCoach, upload.single('file'), importStaff);
router.get('/export/excel', exportStaff);

export default router;
