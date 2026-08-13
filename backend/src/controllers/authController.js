import { findOrCreateUser, generateToken, getUserById, registerUser, loginUser } from '../services/authService.js';

// Google OAuth callback
export const handleGoogleAuth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Autenticazione Google fallita' });
    }

    const user = await findOrCreateUser(req.user);
    const token = generateToken(user);

    // Redirect al frontend con token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
    res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
  } catch (error) {
    console.error('Error in handleGoogleAuth:', error);
    res.status(500).json({ error: 'Errore durante l\'autenticazione' });
  }
};

// Verifica token e ritorna dati utente
export const getCurrentUser = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    res.json({ success: true, user });
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    res.status(500).json({ error: 'Errore nel recupero dati utente' });
  }
};

// Refresh token (opzionale)
export const refreshToken = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    const newToken = generateToken(user);
    res.json({ success: true, token: newToken });
  } catch (error) {
    console.error('Error in refreshToken:', error);
    res.status(500).json({ error: 'Errore nel refresh token' });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    // Con JWT, il logout è gestito lato client (rimuovere token)
    // Ma puoi aggiungere logica server-side se necessario
    res.json({ success: true, message: 'Logout effettuato' });
  } catch (error) {
    console.error('Error in logout:', error);
    res.status(500).json({ error: 'Errore durante il logout' });
  }
};

// Test endpoint
export const health = (req, res) => {
  res.json({ status: 'OK', message: 'Auth service is running' });
};

// Registrazione
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password e name sono richiesti' });
    }

    const user = await registerUser(email, password, name, 'USER');
    const token = generateToken(user);
    res.json({ success: true, token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(400).json({ error: error.message || 'Errore nella registrazione' });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e password sono richiesti' });
    }

    const user = await loginUser(email, password);
    const token = generateToken(user);
    res.json({ success: true, token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(401).json({ error: error.message || 'Errore nel login' });
  }
};

// Test token for development
export const getTestToken = async (req, res) => {
  try {
    const role = req.query.role || 'COACH';
    const testUser = {
      id: 'test-user-1',
      email: 'test@admin.local',
      name: 'Test Admin',
      role,
    };
    const token = generateToken(testUser);
    res.json({ success: true, token, user: testUser });
  } catch (error) {
    console.error('Error generating test token:', error);
    res.status(500).json({ error: 'Errore nella generazione del token di test' });
  }
};
