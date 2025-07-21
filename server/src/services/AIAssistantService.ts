import OpenAI from 'openai';
import { User } from '@/models/User';
import { Employee } from '@/models/Employee';
import { Client } from '@/models/Client';
import { Project } from '@/models/Project';

export interface AIContext {
  userId: string;
  userRole: string;
  department?: string;
  currentModule?: string;
  recentData?: any;
}

export interface AIConversation {
  id: string;
  userId: string;
  messages: {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    context?: any;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export class AIAssistantService {
  private openai: OpenAI;
  private systemPrompt: string;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.systemPrompt = `Tu es l'assistant IA intégré dans un système ERP/CRM d'entreprise. Tu as accès aux données de l'entreprise et tu peux aider les utilisateurs dans leurs tâches quotidiennes.

Tes capacités incluent :
- Analyser les données RH, CRM, finances, projets et RSE
- Générer des résumés et rapports
- Proposer des actions et recommandations
- Répondre aux questions métier spécifiques
- Automatiser certaines tâches répétitives

Tu dois toujours :
- Respecter la confidentialité et les droits d'accès
- Donner des réponses précises et contextuelles
- Proposer des actions concrètes quand c'est pertinent
- Adapter ton langage au rôle de l'utilisateur
- Être proactif dans tes suggestions

Modules disponibles :
1. RH & Paie : Gestion employés, présences, bulletins de paie
2. CRM : Clients, opportunités, devis, factures
3. Finance : Revenus, dépenses, budgets, prévisions
4. Projets : Gestion de projets, tâches, équipes
5. RSE : Indicateurs durabilité, conformité, formations
6. Tableau de bord : Vue d'ensemble et KPIs`;
  }

  async processMessage(
    message: string,
    context: AIContext,
    conversationHistory: any[] = []
  ): Promise<string> {
    try {
      // Construire le contexte enrichi
      const enrichedContext = await this.buildEnrichedContext(context);
      
      // Préparer les messages pour OpenAI
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: this.systemPrompt + this.buildContextualPrompt(enrichedContext),
        },
        ...conversationHistory.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        {
          role: 'user',
          content: message,
        },
      ];

      const completion = await this.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      });

      return completion.choices[0]?.message?.content || 'Désolé, je n\'ai pas pu traiter votre demande.';
    } catch (error) {
      console.error('Erreur service IA:', error);
      return 'Une erreur est survenue lors du traitement de votre demande. Veuillez réessayer.';
    }
  }

  private async buildEnrichedContext(context: AIContext): Promise<any> {
    const enriched: any = {
      user: context,
      data: {},
    };

    try {
      // Récupérer les données utilisateur
      const user = await User.findById(context.userId).select('-password');
      if (user) {
        enriched.user.profile = user;
      }

      // Données selon le module actuel
      switch (context.currentModule) {
        case 'hr':
          enriched.data.employees = await this.getHRInsights(context);
          break;
        case 'crm':
          enriched.data.clients = await this.getCRMInsights(context);
          break;
        case 'projects':
          enriched.data.projects = await this.getProjectInsights(context);
          break;
        case 'dashboard':
          enriched.data.overview = await this.getDashboardInsights(context);
          break;
      }

      return enriched;
    } catch (error) {
      console.error('Erreur construction contexte:', error);
      return enriched;
    }
  }

  private buildContextualPrompt(context: any): string {
    const { user, data } = context;
    
    let prompt = `\n\nContexte utilisateur :
- Nom : ${user.profile?.firstName} ${user.profile?.lastName}
- Rôle : ${user.profile?.role}
- Département : ${user.profile?.department || 'Non spécifié'}
- Module actuel : ${user.currentModule || 'Tableau de bord'}`;

    if (data.employees) {
      prompt += `\n\nDonnées RH récentes :
- Nombre d'employés : ${data.employees.count}
- Nouveaux employés ce mois : ${data.employees.newThisMonth}
- Congés en attente : ${data.employees.pendingLeaves}`;
    }

    if (data.clients) {
      prompt += `\n\nDonnées CRM récentes :
- Nombre de clients : ${data.clients.count}
- Prospects actifs : ${data.clients.prospects}
- Revenus ce mois : ${data.clients.monthlyRevenue}€`;
    }

    if (data.projects) {
      prompt += `\n\nDonnées Projets :
- Projets actifs : ${data.projects.active}
- Tâches en retard : ${data.projects.overdueTasks}
- Progression moyenne : ${data.projects.avgProgress}%`;
    }

    return prompt;
  }

  private async getHRInsights(context: AIContext) {
    try {
      const totalEmployees = await Employee.countDocuments({ status: 'active' });
      const newThisMonth = await Employee.countDocuments({
        hireDate: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
      });

      return {
        count: totalEmployees,
        newThisMonth,
        pendingLeaves: 0, // À implémenter avec le modèle Leave
      };
    } catch (error) {
      return { count: 0, newThisMonth: 0, pendingLeaves: 0 };
    }
  }

  private async getCRMInsights(context: AIContext) {
    try {
      const totalClients = await Client.countDocuments();
      const prospects = await Client.countDocuments({ status: 'prospect' });
      
      return {
        count: totalClients,
        prospects,
        monthlyRevenue: 0, // À calculer avec les données de facturation
      };
    } catch (error) {
      return { count: 0, prospects: 0, monthlyRevenue: 0 };
    }
  }

  private async getProjectInsights(context: AIContext) {
    try {
      const activeProjects = await Project.countDocuments({ status: 'active' });
      const projects = await Project.find({ status: 'active' }).select('progress tasks');
      
      const avgProgress = projects.length > 0 
        ? projects.reduce((sum, p) => sum + p.progress, 0) / projects.length 
        : 0;

      return {
        active: activeProjects,
        overdueTasks: 0, // À calculer
        avgProgress: Math.round(avgProgress),
      };
    } catch (error) {
      return { active: 0, overdueTasks: 0, avgProgress: 0 };
    }
  }

  private async getDashboardInsights(context: AIContext) {
    try {
      const [hrData, crmData, projectData] = await Promise.all([
        this.getHRInsights(context),
        this.getCRMInsights(context),
        this.getProjectInsights(context),
      ]);

      return {
        hr: hrData,
        crm: crmData,
        projects: projectData,
      };
    } catch (error) {
      return {};
    }
  }

  async generateReport(type: string, data: any, context: AIContext): Promise<string> {
    const prompt = `Génère un rapport ${type} basé sur les données suivantes : ${JSON.stringify(data, null, 2)}`;
    
    try {
      const completion = await this.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          { role: 'system', content: this.systemPrompt },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 1500,
      });

      return completion.choices[0]?.message?.content || 'Impossible de générer le rapport.';
    } catch (error) {
      console.error('Erreur génération rapport:', error);
      return 'Erreur lors de la génération du rapport.';
    }
  }

  async suggestActions(module: string, data: any, context: AIContext): Promise<string[]> {
    const prompt = `Sur la base des données du module ${module}, suggère 3-5 actions concrètes à prendre : ${JSON.stringify(data, null, 2)}`;
    
    try {
      const completion = await this.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          { role: 'system', content: this.systemPrompt + '\nRéponds uniquement avec une liste d\'actions numérotées.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.5,
        max_tokens: 500,
      });

      const response = completion.choices[0]?.message?.content || '';
      return response.split('\n').filter(line => line.trim().length > 0);
    } catch (error) {
      console.error('Erreur suggestions:', error);
      return ['Impossible de générer des suggestions pour le moment.'];
    }
  }
}

export const aiAssistant = new AIAssistantService();