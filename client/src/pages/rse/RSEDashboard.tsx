import React from 'react';

export const RSEDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">🌱 RSE & Conformité</h1>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
          + Nouvel indicateur
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Émissions CO²</h3>
          <p className="text-3xl font-bold">2.4t</p>
          <p className="text-sm text-green-600">-15% ce mois</p>
        </div>
        
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Formations réalisées</h3>
          <p className="text-3xl font-bold">24</p>
          <p className="text-sm text-muted-foreground">95% participation</p>
        </div>
        
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Incidents sécurité</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-green-600">Objectif atteint</p>
        </div>
        
        <div className="stat-card">
          <h3 className="font-semibold mb-2">Score conformité</h3>
          <p className="text-3xl font-bold">96%</p>
          <p className="text-sm text-green-600">Excellent</p>
        </div>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Module RSE en développement</h2>
        <p className="text-muted-foreground">
          Le module RSE et Conformité complet sera bientôt disponible avec :
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          <li>• Suivi des indicateurs environnementaux et sociaux</li>
          <li>• Gestion des formations et certifications</li>
          <li>• Enregistrement et suivi des incidents</li>
          <li>• Génération de rapports RSE automatisés</li>
          <li>• Recommandations IA pour améliorer la durabilité</li>
          <li>• Tableaux de bord conformité réglementaire</li>
          <li>• Alertes et rappels de renouvellement</li>
        </ul>
      </div>
    </div>
  );
};