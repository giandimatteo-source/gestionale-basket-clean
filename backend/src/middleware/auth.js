import jwt from 'jsonwebtoken';

// Middleware per verificare JWT token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Token non fornito' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ error: 'Token non valido o scaduto' });
    }
    req.user = user;
    next();
  });
};

// Middleware per verificare se admin
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Non autenticato' });
  }

  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Accesso negato. Admin richiesto.' });
  }

  next();
};

// Middleware per verificare se coach o admin
export const isCoach = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Non autenticato' });
  }

  const allowedRoles = ['ADMIN', 'COACH'];
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Accesso negato. Coach o Admin richiesto.' });
  }

  next();
};

// Middleware opzionale per autenticazione (non blocca se non autenticato)
export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (!err) {
        req.user = user;
      }
    });
  }

  next();
};
