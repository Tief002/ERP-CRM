import axios from 'axios';

// Configuration de base pour l'API
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur de requête pour ajouter le token automatiquement
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponse pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gestion automatique de la déconnexion si token expiré
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Types pour les réponses API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Services API spécialisés
export const authAPI = {
  login: (email: string, password: string) =>
    api.post<ApiResponse<{ user: any; token: string }>>('/api/auth/login', { email, password }),
  
  logout: () =>
    api.post<ApiResponse>('/api/auth/logout'),
  
  me: () =>
    api.get<ApiResponse<{ user: any }>>('/api/auth/me'),
  
  register: (userData: any) =>
    api.post<ApiResponse<{ user: any; token: string }>>('/api/auth/register', userData),
};

export const userAPI = {
  getProfile: () =>
    api.get<ApiResponse<any>>('/api/users/profile'),
  
  updateProfile: (data: any) =>
    api.put<ApiResponse<any>>('/api/users/profile', data),
  
  getUsers: (params?: any) =>
    api.get<ApiResponse<any[]>>('/api/users', { params }),
  
  createUser: (userData: any) =>
    api.post<ApiResponse<any>>('/api/users', userData),
  
  updateUser: (id: string, userData: any) =>
    api.put<ApiResponse<any>>(`/api/users/${id}`, userData),
  
  deleteUser: (id: string) =>
    api.delete<ApiResponse>(`/api/users/${id}`),
};

export const hrAPI = {
  getEmployees: (params?: any) =>
    api.get<ApiResponse<any[]>>('/api/hr/employees', { params }),
  
  getEmployee: (id: string) =>
    api.get<ApiResponse<any>>(`/api/hr/employees/${id}`),
  
  createEmployee: (data: any) =>
    api.post<ApiResponse<any>>('/api/hr/employees', data),
  
  updateEmployee: (id: string, data: any) =>
    api.put<ApiResponse<any>>(`/api/hr/employees/${id}`, data),
  
  deleteEmployee: (id: string) =>
    api.delete<ApiResponse>(`/api/hr/employees/${id}`),
  
  getAttendance: (params?: any) =>
    api.get<ApiResponse<any[]>>('/api/hr/attendance', { params }),
  
  createAttendance: (data: any) =>
    api.post<ApiResponse<any>>('/api/hr/attendance', data),
  
  getPayslips: (params?: any) =>
    api.get<ApiResponse<any[]>>('/api/hr/payslips', { params }),
  
  generatePayslip: (employeeId: string, period: string) =>
    api.post<ApiResponse<any>>('/api/hr/payslips/generate', { employeeId, period }),
};

export const crmAPI = {
  getClients: (params?: any) =>
    api.get<ApiResponse<any[]>>('/api/crm/clients', { params }),
  
  getClient: (id: string) =>
    api.get<ApiResponse<any>>(`/api/crm/clients/${id}`),
  
  createClient: (data: any) =>
    api.post<ApiResponse<any>>('/api/crm/clients', data),
  
  updateClient: (id: string, data: any) =>
    api.put<ApiResponse<any>>(`/api/crm/clients/${id}`, data),
  
  deleteClient: (id: string) =>
    api.delete<ApiResponse>(`/api/crm/clients/${id}`),
  
  getOpportunities: (params?: any) =>
    api.get<ApiResponse<any[]>>('/api/crm/opportunities', { params }),
  
  createOpportunity: (data: any) =>
    api.post<ApiResponse<any>>('/api/crm/opportunities', data),
  
  getQuotes: (params?: any) =>
    api.get<ApiResponse<any[]>>('/api/crm/quotes', { params }),
  
  createQuote: (data: any) =>
    api.post<ApiResponse<any>>('/api/crm/quotes', data),
  
  getInvoices: (params?: any) =>
    api.get<ApiResponse<any[]>>('/api/crm/invoices', { params }),
  
  createInvoice: (data: any) =>
    api.post<ApiResponse<any>>('/api/crm/invoices', data),
};

export const projectAPI = {
  getProjects: (params?: any) =>
    api.get<ApiResponse<any[]>>('/api/projects', { params }),
  
  getProject: (id: string) =>
    api.get<ApiResponse<any>>(`/api/projects/${id}`),
  
  createProject: (data: any) =>
    api.post<ApiResponse<any>>('/api/projects', data),
  
  updateProject: (id: string, data: any) =>
    api.put<ApiResponse<any>>(`/api/projects/${id}`, data),
  
  deleteProject: (id: string) =>
    api.delete<ApiResponse>(`/api/projects/${id}`),
  
  getTasks: (projectId: string, params?: any) =>
    api.get<ApiResponse<any[]>>(`/api/projects/${projectId}/tasks`, { params }),
  
  createTask: (projectId: string, data: any) =>
    api.post<ApiResponse<any>>(`/api/projects/${projectId}/tasks`, data),
  
  updateTask: (projectId: string, taskId: string, data: any) =>
    api.put<ApiResponse<any>>(`/api/projects/${projectId}/tasks/${taskId}`, data),
  
  deleteTask: (projectId: string, taskId: string) =>
    api.delete<ApiResponse>(`/api/projects/${projectId}/tasks/${taskId}`),
};

export const financeAPI = {
  getTransactions: (params?: any) =>
    api.get<ApiResponse<any[]>>('/api/finance/transactions', { params }),
  
  createTransaction: (data: any) =>
    api.post<ApiResponse<any>>('/api/finance/transactions', data),
  
  getBudgets: (params?: any) =>
    api.get<ApiResponse<any[]>>('/api/finance/budgets', { params }),
  
  createBudget: (data: any) =>
    api.post<ApiResponse<any>>('/api/finance/budgets', data),
  
  getReports: (type: string, params?: any) =>
    api.get<ApiResponse<any>>(`/api/finance/reports/${type}`, { params }),
  
  getDashboardData: () =>
    api.get<ApiResponse<any>>('/api/finance/dashboard'),
};

export const rseAPI = {
  getIndicators: (params?: any) =>
    api.get<ApiResponse<any[]>>('/api/rse/indicators', { params }),
  
  createIndicator: (data: any) =>
    api.post<ApiResponse<any>>('/api/rse/indicators', data),
  
  getTrainings: (params?: any) =>
    api.get<ApiResponse<any[]>>('/api/rse/trainings', { params }),
  
  createTraining: (data: any) =>
    api.post<ApiResponse<any>>('/api/rse/trainings', data),
  
  getIncidents: (params?: any) =>
    api.get<ApiResponse<any[]>>('/api/rse/incidents', { params }),
  
  createIncident: (data: any) =>
    api.post<ApiResponse<any>>('/api/rse/incidents', data),
  
  getReports: (type: string, params?: any) =>
    api.get<ApiResponse<any>>(`/api/rse/reports/${type}`, { params }),
};

export const aiAPI = {
  sendMessage: (message: string, context?: any) =>
    api.post<ApiResponse<{ response: string }>>('/api/ai/chat', { message, context }),
  
  getConversations: () =>
    api.get<ApiResponse<any[]>>('/api/ai/conversations'),
  
  getConversation: (id: string) =>
    api.get<ApiResponse<any>>(`/api/ai/conversations/${id}`),
  
  generateReport: (type: string, data: any) =>
    api.post<ApiResponse<{ report: string }>>('/api/ai/generate-report', { type, data }),
  
  getSuggestions: (module: string, data: any) =>
    api.post<ApiResponse<{ suggestions: string[] }>>('/api/ai/suggestions', { module, data }),
};

export default api;