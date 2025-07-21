import React from 'react';

export const FinanceDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">💰 Finance & Comptabilité</h1>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
          + Nouvelle transaction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card">
          <h3 className="font-semibold mb-2">CA mensuel</h3>
          <p className="text-3xl font-bold">€85,420</p>
          <p className="text-sm text-green-600">+12% vs mois dernier</p>
        </div>
        
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Dépenses</h3>
          <p className="text-3xl font-bold">€34,120</p>
          <p className="text-sm text-muted-foreground">Ce mois</p>
        </div>
        
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Bénéfice net</h3>
          <p className="text-3xl font-bold">€51,300</p>
          <p className="text-sm text-green-600">Marge 60%</p>
        </div>
        
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Factures impayées</h3>
          <p className="text-3xl font-bold">€23,450</p>
          <p className="text-sm text-orange-600">8 factures</p>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Module Finance en développement</h2>
        <p className="text-muted-foreground">
          Le module Finance complet sera bientôt disponible avec :
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          <li>• Suivi en temps réel des revenus et dépenses</li>
          <li>• Tableaux de bord financiers interactifs</li>
          <li>• Alertes budgétaires et prévisions IA</li>
          <li>• Génération automatique de rapports comptables</li>
          <li>• Facturation et relances automatisées</li>
          <li>• Intégration bancaire et conciliation</li>
          <li>• Analyse de rentabilité par projet/client</li>
        </ul>
      </div>
    </div>
  );
};