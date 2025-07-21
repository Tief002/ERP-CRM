import React from 'react';

export const CRMDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">🤝 CRM - Gestion Client</h1>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
          + Nouveau client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Clients totaux</h3>
          <p className="text-3xl font-bold">138</p>
          <p className="text-sm text-muted-foreground">+5 ce mois</p>
        </div>
        
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Prospects actifs</h3>
          <p className="text-3xl font-bold">23</p>
          <p className="text-sm text-muted-foreground">En négociation</p>
        </div>
        
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Devis en attente</h3>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-muted-foreground">€145K potentiel</p>
        </div>
        
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Taux de conversion</h3>
          <p className="text-3xl font-bold">24%</p>
          <p className="text-sm text-muted-foreground">+3% ce mois</p>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Module CRM en développement</h2>
        <p className="text-muted-foreground">
          Le module CRM complet sera bientôt disponible avec :
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          <li>• Gestion complète des clients et prospects</li>
          <li>• Pipeline de vente avec suivi d'opportunités</li>
          <li>• Génération automatique de devis et factures</li>
          <li>• Relances automatisées par IA</li>
          <li>• Analytics et prévisions de vente</li>
          <li>• Intégration email et calendrier</li>
        </ul>
      </div>
    </div>
  );
};