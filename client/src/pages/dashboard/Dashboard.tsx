import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* En-tête de bienvenue */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Bienvenue, {user?.firstName} {user?.lastName} !
        </h1>
        <p className="text-muted-foreground">
          Voici un aperçu de votre système ERP/CRM avec assistant IA intégré.
        </p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Employés actifs</p>
              <p className="text-2xl font-bold">42</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Clients</p>
              <p className="text-2xl font-bold">138</p>
            </div>
            <div className="text-3xl">🤝</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Projets actifs</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="text-3xl">📦</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">CA mensuel</p>
              <p className="text-2xl font-bold">€85K</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>
      </div>

      {/* Modules disponibles */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Modules disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="module-card">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-lg font-semibold mb-2">Ressources Humaines</h3>
            <p className="text-muted-foreground mb-4">
              Gestion des employés, présences, congés et bulletins de paie
            </p>
            <a
              href="/hr"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
            >
              Accéder au module →
            </a>
          </div>

          <div className="module-card">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="text-lg font-semibold mb-2">CRM</h3>
            <p className="text-muted-foreground mb-4">
              Gestion des clients, opportunités et processus de vente
            </p>
            <a
              href="/crm"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
            >
              Accéder au module →
            </a>
          </div>

          <div className="module-card">
            <div className="text-3xl mb-3">📦</div>
            <h3 className="text-lg font-semibold mb-2">Gestion de Projets</h3>
            <p className="text-muted-foreground mb-4">
              Planification, suivi et collaboration sur les projets
            </p>
            <a
              href="/projects"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
            >
              Accéder au module →
            </a>
          </div>

          <div className="module-card">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="text-lg font-semibold mb-2">Finance & Comptabilité</h3>
            <p className="text-muted-foreground mb-4">
              Suivi financier, budgets et rapports comptables
            </p>
            <a
              href="/finance"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
            >
              Accéder au module →
            </a>
          </div>

          <div className="module-card">
            <div className="text-3xl mb-3">🌱</div>
            <h3 className="text-lg font-semibold mb-2">RSE & Conformité</h3>
            <p className="text-muted-foreground mb-4">
              Indicateurs durabilité et gestion de la conformité
            </p>
            <a
              href="/rse"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
            >
              Accéder au module →
            </a>
          </div>

          <div className="module-card ai-gradient text-white">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-lg font-semibold mb-2">Assistant IA</h3>
            <p className="text-white/80 mb-4">
              Votre assistant intelligent pour analyser et optimiser
            </p>
            <button className="inline-flex items-center text-white hover:text-white/80 font-medium">
              Ouvrir l'assistant →
            </button>
          </div>
        </div>
      </div>

      {/* Activité récente */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
        <div className="bg-card rounded-lg border p-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Nouveau client ajouté : Entreprise ABC</span>
              <span className="text-xs text-muted-foreground ml-auto">Il y a 2h</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Projet "Site Web" mis à jour</span>
              <span className="text-xs text-muted-foreground ml-auto">Il y a 4h</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Bulletin de paie généré pour Mars 2024</span>
              <span className="text-xs text-muted-foreground ml-auto">Hier</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};