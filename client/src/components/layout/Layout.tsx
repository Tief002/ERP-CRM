import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar temporaire */}
        <div className="w-64 bg-card border-r border-border p-4">
          <div className="text-xl font-bold mb-6">ERP/CRM AI</div>
          <nav className="space-y-2">
            <a href="/dashboard" className="block p-2 rounded hover:bg-accent">📊 Dashboard</a>
            <a href="/hr" className="block p-2 rounded hover:bg-accent">👥 RH</a>
            <a href="/crm" className="block p-2 rounded hover:bg-accent">🤝 CRM</a>
            <a href="/projects" className="block p-2 rounded hover:bg-accent">📦 Projets</a>
            <a href="/finance" className="block p-2 rounded hover:bg-accent">💰 Finance</a>
            <a href="/rse" className="block p-2 rounded hover:bg-accent">🌱 RSE</a>
          </nav>
        </div>
        
        {/* Contenu principal */}
        <div className="flex-1">
          {/* Header temporaire */}
          <header className="bg-card border-b border-border p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Tableau de bord</h1>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full bg-primary text-primary-foreground">
                  🤖 Assistant IA
                </button>
                <div className="w-8 h-8 rounded-full bg-secondary"></div>
              </div>
            </div>
          </header>
          
          {/* Contenu */}
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};