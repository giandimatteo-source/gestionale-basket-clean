import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getAllRoster,
  getRosterById,
  createRoster,
  updateRoster,
  deleteRoster,
  updatePlayerStats,
  updatePlayTypeStats,
  getRosterStats,
} from '../controllers/rosterController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Setup multer per upload foto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../../uploads/roster');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo immagini JPEG, PNG o WebP sono permesse'));
    }
  },
});

// ============= GET ROUTES =============

// Lista giocatrici
router.get('/', verifyToken, getAllRoster);

// Singola giocatrice
router.get('/:id', verifyToken, getRosterById);

// Stats roster
router.get('/stats/summary', verifyToken, getRosterStats);

// ============= CREATE ROUTES =============

// Creare giocatrice
router.post('/', verifyToken, upload.single('photo'), createRoster);

// ============= UPDATE ROUTES =============

// Modificare giocatrice
router.put('/:id', verifyToken, upload.single('photo'), updateRoster);

// Aggiornare stats
router.put('/:id/stats', verifyToken, updatePlayerStats);

// Aggiornare play type stats
router.put('/:id/playtypes', verifyToken, updatePlayTypeStats);

// ============= DELETE ROUTES =============

// Eliminare giocatrice
router.delete('/:id', verifyToken, deleteRoster);

export default router;
