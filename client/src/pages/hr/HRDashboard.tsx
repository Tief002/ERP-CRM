import React from 'react';

export const HRDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">👥 Ressources Humaines</h1>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
          + Nouvel employé
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Employés actifs</h3>
          <p className="text-3xl font-bold">42</p>
          <p className="text-sm text-muted-foreground">+2 ce mois</p>
        </div>
        
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Congés en attente</h3>
          <p className="text-3xl font-bold">7</p>
          <p className="text-sm text-muted-foreground">À approuver</p>
        </div>
        
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Heures supplémentaires</h3>
          <p className="text-3xl font-bold">124h</p>
          <p className="text-sm text-muted-foreground">Ce mois</p>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Module RH en développement</h2>
        <p className="text-muted-foreground">
          Le module RH complet sera bientôt disponible avec :
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          <li>• Gestion complète des employés</li>
          <li>• Suivi des présences et congés</li>
          <li>• Génération automatique des bulletins de paie</li>
          <li>• Assistant IA pour questions RH</li>
          <li>• Rapports et analytics RH</li>
        </ul>
      </div>
    </div>
  );
};