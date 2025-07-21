# 🚀 ERP/CRM AI - Système de gestion d'entreprise intelligent

## 📋 Description

ERP/CRM complet avec IA intégrée pour entreprises de toutes tailles. Solution modulaire couvrant RH, CRM, Finance, Gestion de projets, RSE et Assistant IA centralisé.

## 🏗️ Architecture

```
erp-crm-ai/
├── client/                    # Frontend React + TypeScript
│   ├── src/
│   │   ├── components/        # Composants réutilisables
│   │   │   ├── ui/           # Composants UI de base
│   │   │   ├── layout/       # Layout et navigation
│   │   │   ├── forms/        # Formulaires modulaires
│   │   │   ├── charts/       # Graphiques et tableaux de bord
│   │   │   └── ai/           # Interface assistant IA
│   │   ├── pages/            # Pages principales par module
│   │   │   ├── auth/         # Authentification
│   │   │   ├── dashboard/    # Tableau de bord général
│   │   │   ├── hr/           # Module RH
│   │   │   ├── crm/          # Module CRM
│   │   │   ├── finance/      # Module Finance
│   │   │   ├── projects/     # Module Projets
│   │   │   └── rse/          # Module RSE
│   │   ├── hooks/            # Hooks React personnalisés
│   │   ├── contexts/         # Contextes React (Auth, IA, etc.)
│   │   ├── utils/            # Utilitaires frontend
│   │   └── types/            # Types TypeScript
│   ├── public/               # Assets statiques
│   └── dist/                 # Build frontend
├── server/                   # Backend Node.js + Express
│   ├── src/
│   │   ├── controllers/      # Contrôleurs par module
│   │   ├── models/           # Modèles MongoDB/Mongoose
│   │   ├── routes/           # Routes API modulaires
│   │   ├── middleware/       # Middlewares (auth, validation, etc.)
│   │   ├── services/         # Services métier et IA
│   │   ├── utils/            # Utilitaires backend
│   │   ├── types/            # Types TypeScript partagés
│   │   └── config/           # Configuration (DB, IA, etc.)
│   └── dist/                 # Build backend
└── docs/                     # Documentation
```

## 🎯 Modules

### 1. 📍 Ressources Humaines & Paie
- Gestion employés, présences, congés
- Génération bulletins de paie (PDF)
- Assistant RH IA

### 2. 🤝 CRM Augmenté
- Contacts, opportunités, suivi clients
- Devis/factures automatiques
- Relances IA, résumés conversations

### 3. 📊 Finances & Comptabilité
- Revenus, dépenses, dettes
- Tableaux de bord temps réel
- Alertes budgétaires, prévisions

### 4. 📦 Gestion de Projets
- Projets, jalons, tâches
- Vue Kanban dynamique
- Répartition tâches IA

### 5. 🌱 RSE / Conformité
- Indicateurs environnementaux/sociaux
- Formations, alertes, incidents
- Rapports pour auditeurs

### 6. 🤖 Assistant IA Centralisé
- Accessible dans tous modules
- Analyse contextuelle
- Interface conversationnelle

## 🛠️ Technologies

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Shadcn/ui
- **Backend**: Node.js + Express + TypeScript
- **Base de données**: MongoDB + Mongoose
- **IA**: OpenAI GPT-4 API
- **Authentification**: JWT + bcrypt
- **PDF**: Puppeteer/jsPDF
- **Temps réel**: Socket.io

## 🚀 Installation

### Prérequis
- Node.js 18+
- MongoDB 6+
- Compte OpenAI API

### Setup rapide

```bash
# 1. Installation des dépendances
npm install

# 2. Configuration des variables d'environnement
cp .env.example .env
# Éditer .env avec vos configurations

# 3. Démarrage en mode développement
npm run dev

# Frontend: http://localhost:5173
# Backend: http://localhost:3001
```

### Variables d'environnement

```env
# Base de données
MONGODB_URI=mongodb://localhost:27017/erp-crm-ai
DB_NAME=erp_crm_ai

# Authentification
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4

# Email (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Serveur
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 📊 Schéma de base de données

### Collections principales:
- **users**: Utilisateurs et authentification
- **employees**: Données RH et paie
- **clients**: Contacts et prospects CRM
- **projects**: Projets et tâches
- **finances**: Transactions financières
- **rse_data**: Indicateurs RSE
- **ai_conversations**: Historique assistant IA

## 🔐 Sécurité

- Authentification JWT robuste
- Rôles: Admin, Manager, Employé
- Validation des données côté serveur
- Rate limiting API
- Chiffrement des mots de passe
- Protection CORS et headers sécurisés

## 🎨 Interface utilisateur

- Design moderne et responsive
- Mode sombre/clair
- Navigation intuitive
- Composants réutilisables
- Accessibilité ARIA

## 🤖 Assistant IA

L'assistant IA est contextuel et capable de:
- Analyser les données de l'entreprise
- Générer des résumés et rapports
- Proposer des actions
- Répondre aux questions métier
- Automatiser les tâches répétitives

## 📈 Déploiement

### Production
```bash
npm run build
npm start
```

### Docker (optionnel)
```bash
docker-compose up -d
```

## 🔄 Roadmap

- [x] Architecture de base
- [x] Module RH + Assistant IA
- [ ] Module CRM complet
- [ ] Module Finance avancé
- [ ] Module Projets Kanban
- [ ] Module RSE
- [ ] API mobile
- [ ] Intégrations externes
- [ ] Multilingue

## 📞 Support

Pour toute question ou suggestion, créez une issue GitHub ou contactez l'équipe de développement.

## 📄 Licence

MIT License - voir le fichier LICENSE pour plus de détails.