import express from 'express';
import passport from 'passport';
import { handleGoogleAuth, getCurrentUser, refreshToken, logout, health, getTestToken, register, login } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Health check
router.get('/health', health);

// Email/Password Authentication
router.post('/register', register);
router.post('/login', login);

// Test token (development only)
router.get('/test-token', getTestToken);

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/auth/failure',
    session: false,
  }),
  handleGoogleAuth
);

// Ottieni dati utente corrente
router.get('/me', verifyToken, getCurrentUser);

// Refresh token
router.post('/refresh', verifyToken, refreshToken);

// Logout
router.post('/logout', verifyToken, logout);

// Failure redirect
router.get('/failure', (req, res) => {
  res.status(401).json({ error: 'Autenticazione Google fallita' });
});

export default router;
