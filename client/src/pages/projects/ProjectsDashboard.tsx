import React from 'react';

export const ProjectsDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">📦 Gestion de Projets</h1>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
          + Nouveau projet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Projets actifs</h3>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-muted-foreground">3 en retard</p>
        </div>
        
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Tâches ouvertes</h3>
          <p className="text-3xl font-bold">89</p>
          <p className="text-sm text-muted-foreground">23 prioritaires</p>
        </div>
        
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Progression moyenne</h3>
          <p className="text-3xl font-bold">68%</p>
          <p className="text-sm text-muted-foreground">+5% ce mois</p>
        </div>
        
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Budget utilisé</h3>
          <p className="text-3xl font-bold">€234K</p>
          <p className="text-sm text-muted-foreground">sur €350K</p>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Module Projets en développement</h2>
        <p className="text-muted-foreground">
          Le module de gestion de projets complet sera bientôt disponible avec :
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          <li>• Gestion complète des projets et jalons</li>
          <li>• Vue Kanban pour le suivi des tâches</li>
          <li>• Répartition intelligente des tâches par IA</li>
          <li>• Collaboration en temps réel</li>
          <li>• Suivi du temps et des budgets</li>
          <li>• Rapports de progression automatisés</li>
          <li>• Gestion des risques et dépendances</li>
        </ul>
      </div>
    </div>
  );
};