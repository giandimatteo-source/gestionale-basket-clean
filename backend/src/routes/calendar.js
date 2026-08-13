import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  acceptEvent,
  declineEvent,
} from '../controllers/calendarController.js';

const router = express.Router();

// Middleware per verificare permessi ADMIN/EDITOR per modifica
const checkEditPermission = (req, res, next) => {
  const user = req.user;
  if (!['ADMIN', 'EDITOR'].includes(user?.role)) {
    return res.status(403).json({ success: false, error: 'Non hai permessi per modificare gli eventi' });
  }
  next();
};

// GET - recupera eventi per un range di date
router.get('/', verifyToken, getEvents);

// GET - recupera un evento specifico
router.get('/:id', verifyToken, getEventById);

// POST - crea un nuovo evento (solo ADMIN/EDITOR)
router.post('/', verifyToken, checkEditPermission, createEvent);

// PUT - aggiorna un evento (solo ADMIN/EDITOR)
router.put('/:id', verifyToken, checkEditPermission, updateEvent);

// DELETE - elimina un evento (solo ADMIN/EDITOR)
router.delete('/:id', verifyToken, checkEditPermission, deleteEvent);

// POST - accetta un invito a un evento
router.post('/:id/accept', verifyToken, acceptEvent);

// POST - rifiuta un invito a un evento
router.post('/:id/decline', verifyToken, declineEvent);

export default router;
