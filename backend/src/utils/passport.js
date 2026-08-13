import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

const clientID = process.env.GOOGLE_CLIENT_ID || 'test_client_id_123';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || 'test_client_secret_456';
const callbackURL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback';

// Configurare Google Strategy
passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID,
      clientSecret,
      callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Questo viene chiamato dopo che Google autentica l'utente
      // Profile contiene i dati dell'utente Google
      return done(null, profile);
    }
  )
);

// Serializzare/deserializzare utente per sessione
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
