# 🚀 Guide de démarrage rapide - ERP/CRM AI

## 📋 Prérequis

- Node.js 18+ 
- MongoDB 6+
- Compte OpenAI API (optionnel pour l'IA)

## ⚡ Installation rapide

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration de l'environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer le fichier .env avec vos configurations
nano .env
```

### 3. Variables d'environnement essentielles
```env
# Base de données
MONGODB_URI=mongodb://localhost:27017/erp-crm-ai

# Authentification
JWT_SECRET=votre_clé_jwt_très_secrète

# OpenAI (optionnel)
OPENAI_API_KEY=sk-votre-clé-openai

# Serveur
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 4. Démarrage de MongoDB
```bash
# Ubuntu/Debian
sudo systemctl start mongod

# macOS avec Homebrew
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 5. Démarrage de l'application
```bash
# Démarrage complet (frontend + backend)
npm run dev

# OU séparément
npm run server:dev   # Backend sur port 3001
npm run client:dev   # Frontend sur port 5173
```

## 🎯 Accès à l'application

- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:3001
- **Health check** : http://localhost:3001/health

## 👤 Compte de démonstration

Pour tester l'application sans backend complet :
- **Email** : admin@demo.com
- **Mot de passe** : password123

## 📂 Structure du projet

```
erp-crm-ai/
├── client/                # Frontend React
│   ├── src/
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/         # Pages par module
│   │   ├── contexts/      # Contextes React (Auth, IA)
│   │   ├── hooks/         # Hooks personnalisés
│   │   └── utils/         # Utilitaires
├── server/                # Backend Node.js
│   ├── src/
│   │   ├── models/        # Modèles MongoDB
│   │   ├── routes/        # Routes API
│   │   ├── middleware/    # Middlewares
│   │   ├── services/      # Services métier
│   │   └── config/        # Configuration
└── docs/                  # Documentation
```

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev              # Frontend + Backend
npm run client:dev       # Frontend seulement
npm run server:dev       # Backend seulement

# Production
npm run build           # Build complet
npm run start           # Démarrage production
npm run client:build    # Build frontend
npm run server:build    # Build backend

# Qualité code
npm run lint            # Vérification ESLint
npm test               # Tests Jest
```

## 🎨 Fonctionnalités actuelles

### ✅ Implémenté
- Architecture complète (Frontend + Backend)
- Authentification JWT
- Système de routing modulaire
- Contextes React (Auth, Thème, IA)
- Interface utilisateur responsive
- Modèles de données pour tous les modules
- Service d'assistant IA (structure)
- Configuration complète (TypeScript, Tailwind, etc.)

### 🚧 En développement
- API REST complète pour tous les modules
- Interface d'assistant IA interactive
- Tableaux de bord avec données réelles
- Génération de rapports PDF
- Système de notifications temps réel
- Intégrations IA avancées

## 🔗 Modules disponibles

1. **📊 Dashboard** - Vue d'ensemble et KPIs
2. **👥 RH** - Gestion employés et paie
3. **🤝 CRM** - Gestion clients et ventes
4. **📦 Projets** - Gestion de projets et tâches
5. **💰 Finance** - Comptabilité et budget
6. **🌱 RSE** - Conformité et durabilité
7. **🤖 Assistant IA** - Intelligence artificielle intégrée

## 🐛 Dépannage

### Problème de connexion MongoDB
```bash
# Vérifier le statut
sudo systemctl status mongod

# Redémarrer MongoDB
sudo systemctl restart mongod
```

### Erreur de port occupé
```bash
# Tuer les processus sur les ports
sudo lsof -ti:3001 | xargs kill -9
sudo lsof -ti:5173 | xargs kill -9
```

### Problème de dépendances
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez que tous les prérequis sont installés
2. Consultez les logs d'erreur dans la console
3. Vérifiez la configuration des variables d'environnement
4. Redémarrez MongoDB et l'application

## 🚀 Prochaines étapes

1. **Développement des APIs** - Compléter les routes backend
2. **Interface IA** - Intégrer l'assistant conversationnel
3. **Données de démonstration** - Ajouter des données d'exemple
4. **Tests** - Ajouter la couverture de tests
5. **Documentation** - Compléter la documentation API

---

**Bon développement ! 🎉**