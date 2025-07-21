import React, { createContext, useContext, useState, useCallback } from 'react';
import { aiAPI } from '@/utils/api';
import { useAuth } from './AuthContext';

// Types
interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  context?: any;
}

interface AIConversation {
  id: string;
  messages: AIMessage[];
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AIContextType {
  conversations: AIConversation[];
  currentConversation: AIConversation | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  sendMessage: (message: string, context?: any) => Promise<void>;
  createConversation: (title?: string) => AIConversation;
  selectConversation: (id: string) => void;
  clearConversation: () => void;
  deleteConversation: (id: string) => void;
  generateReport: (type: string, data: any) => Promise<string>;
  getSuggestions: (module: string, data: any) => Promise<string[]>;
  setCurrentModule: (module: string) => void;
  
  // État
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentModule: string;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  const [conversations, setConversations] = useState<AIConversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<AIConversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState('dashboard');

  // Générer un ID unique
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Créer une nouvelle conversation
  const createConversation = useCallback((title?: string): AIConversation => {
    const newConversation: AIConversation = {
      id: generateId(),
      title: title || `Conversation ${new Date().toLocaleString()}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversation(newConversation);
    
    return newConversation;
  }, []);

  // Sélectionner une conversation
  const selectConversation = useCallback((id: string) => {
    const conversation = conversations.find(c => c.id === id);
    if (conversation) {
      setCurrentConversation(conversation);
    }
  }, [conversations]);

  // Effacer la conversation actuelle
  const clearConversation = useCallback(() => {
    if (currentConversation) {
      const updated = { ...currentConversation, messages: [] };
      setCurrentConversation(updated);
      setConversations(prev => 
        prev.map(c => c.id === updated.id ? updated : c)
      );
    }
  }, [currentConversation]);

  // Supprimer une conversation
  const deleteConversation = useCallback((id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (currentConversation?.id === id) {
      setCurrentConversation(null);
    }
  }, [currentConversation]);

  // Envoyer un message
  const sendMessage = useCallback(async (message: string, context?: any) => {
    if (!message.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Créer une conversation si elle n'existe pas
      let conversation = currentConversation;
      if (!conversation) {
        conversation = createConversation();
      }

      // Ajouter le message utilisateur
      const userMessage: AIMessage = {
        id: generateId(),
        role: 'user',
        content: message,
        timestamp: new Date(),
        context,
      };

      const updatedMessages = [...conversation.messages, userMessage];

      // Mettre à jour la conversation avec le message utilisateur
      const updatedConversation = {
        ...conversation,
        messages: updatedMessages,
        updatedAt: new Date(),
      };

      setCurrentConversation(updatedConversation);
      setConversations(prev => 
        prev.map(c => c.id === updatedConversation.id ? updatedConversation : c)
      );

      // Envoyer le message à l'API
      const response = await aiAPI.sendMessage(message, {
        userId: user?.id,
        userRole: user?.role,
        department: user?.department,
        currentModule,
        ...context,
      });

      // Ajouter la réponse de l'IA
      const aiMessage: AIMessage = {
        id: generateId(),
        role: 'assistant',
        content: response.data.data?.response || 'Désolé, je n\'ai pas pu traiter votre demande.',
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, aiMessage];
      const finalConversation = {
        ...updatedConversation,
        messages: finalMessages,
        updatedAt: new Date(),
      };

      setCurrentConversation(finalConversation);
      setConversations(prev => 
        prev.map(c => c.id === finalConversation.id ? finalConversation : c)
      );

    } catch (err: any) {
      console.error('Erreur AI:', err);
      setError(err.response?.data?.message || 'Erreur lors de l\'envoi du message');
    } finally {
      setIsLoading(false);
    }
  }, [currentConversation, createConversation, user, currentModule]);

  // Générer un rapport
  const generateReport = useCallback(async (type: string, data: any): Promise<string> => {
    setIsLoading(true);
    try {
      const response = await aiAPI.generateReport(type, data);
      return response.data.data?.report || 'Erreur lors de la génération du rapport';
    } catch (err: any) {
      console.error('Erreur génération rapport:', err);
      throw new Error(err.response?.data?.message || 'Erreur lors de la génération du rapport');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Obtenir des suggestions
  const getSuggestions = useCallback(async (module: string, data: any): Promise<string[]> => {
    setIsLoading(true);
    try {
      const response = await aiAPI.getSuggestions(module, data);
      return response.data.data?.suggestions || [];
    } catch (err: any) {
      console.error('Erreur suggestions:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: AIContextType = {
    conversations,
    currentConversation,
    isLoading,
    error,
    sendMessage,
    createConversation,
    selectConversation,
    clearConversation,
    deleteConversation,
    generateReport,
    getSuggestions,
    isOpen,
    setIsOpen,
    currentModule,
    setCurrentModule,
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};

export const useAI = (): AIContextType => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};