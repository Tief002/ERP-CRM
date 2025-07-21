import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDatabase } from './src/config/database';

// Configuration des variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de sécurité
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: {
    success: false,
    message: 'Trop de requêtes, veuillez réessayer plus tard',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Middleware de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes de santé
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'ERP/CRM AI Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Routes API (à implémenter)
app.use('/api/auth', async (req, res, next) => {
  // Routes d'authentification - à implémenter
  res.json({ message: 'Auth routes - En cours de développement' });
});

app.use('/api/users', async (req, res, next) => {
  // Routes utilisateurs - à implémenter
  res.json({ message: 'User routes - En cours de développement' });
});

app.use('/api/hr', async (req, res, next) => {
  // Routes RH - à implémenter
  res.json({ message: 'HR routes - En cours de développement' });
});

app.use('/api/crm', async (req, res, next) => {
  // Routes CRM - à implémenter
  res.json({ message: 'CRM routes - En cours de développement' });
});

app.use('/api/projects', async (req, res, next) => {
  // Routes projets - à implémenter
  res.json({ message: 'Projects routes - En cours de développement' });
});

app.use('/api/finance', async (req, res, next) => {
  // Routes finance - à implémenter
  res.json({ message: 'Finance routes - En cours de développement' });
});

app.use('/api/rse', async (req, res, next) => {
  // Routes RSE - à implémenter
  res.json({ message: 'RSE routes - En cours de développement' });
});

app.use('/api/ai', async (req, res, next) => {
  // Routes assistant IA - à implémenter
  res.json({ message: 'AI Assistant routes - En cours de développement' });
});

// Middleware de gestion d'erreurs
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erreur serveur:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Une erreur interne s\'est produite' 
      : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
    path: req.originalUrl,
  });
});

// Démarrage du serveur
const startServer = async (): Promise<void> => {
  try {
    // Connexion à la base de données
    await connectDatabase();

    // Démarrage du serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur ERP/CRM AI démarré sur le port ${PORT}`);
      console.log(`📊 Environnement: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API disponible sur: http://localhost:${PORT}`);
      console.log(`📋 Health check: http://localhost:${PORT}/health`);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`🖥️  Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
      }
    });

  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

// Gestion gracieuse de l'arrêt
process.on('SIGTERM', () => {
  console.log('🛑 Signal SIGTERM reçu, arrêt du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Signal SIGINT reçu, arrêt du serveur...');
  process.exit(0);
});

// Démarrage
startServer().catch((error) => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});