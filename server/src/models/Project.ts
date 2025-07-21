import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'in_review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo?: mongoose.Types.ObjectId;
  estimatedHours?: number;
  actualHours?: number;
  dueDate?: Date;
  completedAt?: Date;
  dependencies: mongoose.Types.ObjectId[];
  attachments: string[];
  comments: {
    author: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
  }[];
}

export interface IProject extends Document {
  projectId: string;
  name: string;
  description: string;
  client?: mongoose.Types.ObjectId;
  manager: mongoose.Types.ObjectId;
  team: mongoose.Types.ObjectId[];
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: Date;
  dueDate?: Date;
  completedAt?: Date;
  budget: {
    allocated: number;
    spent: number;
    currency: string;
  };
  progress: number;
  tasks: ITask[];
  milestones: {
    name: string;
    description: string;
    dueDate: Date;
    completedAt?: Date;
    tasks: mongoose.Types.ObjectId[];
  }[];
  resources: {
    name: string;
    type: 'human' | 'material' | 'software' | 'other';
    quantity: number;
    cost: number;
  }[];
  risks: {
    title: string;
    description: string;
    impact: 'low' | 'medium' | 'high';
    probability: 'low' | 'medium' | 'high';
    mitigation: string;
    status: 'open' | 'mitigated' | 'closed';
  }[];
  tags: string[];
  documents: string[];
  settings: {
    visibility: 'private' | 'team' | 'company';
    notifications: boolean;
    autoProgress: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['todo', 'in_progress', 'in_review', 'done'],
    default: 'todo',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  estimatedHours: {
    type: Number,
    min: 0,
  },
  actualHours: {
    type: Number,
    min: 0,
    default: 0,
  },
  dueDate: Date,
  completedAt: Date,
  dependencies: [{
    type: Schema.Types.ObjectId,
  }],
  attachments: [String],
  comments: [{
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

const projectSchema = new Schema<IProject>({
  projectId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  team: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  status: {
    type: String,
    enum: ['planning', 'active', 'on_hold', 'completed', 'cancelled'],
    default: 'planning',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
  },
  startDate: {
    type: Date,
    required: true,
  },
  dueDate: Date,
  completedAt: Date,
  budget: {
    allocated: {
      type: Number,
      required: true,
      min: 0,
    },
    spent: {
      type: Number,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      default: 'EUR',
    },
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  tasks: [taskSchema],
  milestones: [{
    name: {
      type: String,
      required: true,
    },
    description: String,
    dueDate: {
      type: Date,
      required: true,
    },
    completedAt: Date,
    tasks: [{
      type: Schema.Types.ObjectId,
    }],
  }],
  resources: [{
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['human', 'material', 'software', 'other'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
    },
  }],
  risks: [{
    title: {
      type: String,
      required: true,
    },
    description: String,
    impact: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    probability: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    mitigation: String,
    status: {
      type: String,
      enum: ['open', 'mitigated', 'closed'],
      default: 'open',
    },
  }],
  tags: [{
    type: String,
    trim: true,
  }],
  documents: [String],
  settings: {
    visibility: {
      type: String,
      enum: ['private', 'team', 'company'],
      default: 'team',
    },
    notifications: {
      type: Boolean,
      default: true,
    },
    autoProgress: {
      type: Boolean,
      default: true,
    },
  },
}, {
  timestamps: true,
});

// Index pour la recherche
projectSchema.index({ projectId: 1 });
projectSchema.index({ name: 'text' });
projectSchema.index({ status: 1 });
projectSchema.index({ priority: 1 });
projectSchema.index({ manager: 1 });
projectSchema.index({ team: 1 });
projectSchema.index({ client: 1 });
projectSchema.index({ tags: 1 });
projectSchema.index({ startDate: 1 });
projectSchema.index({ dueDate: 1 });

export const Project = mongoose.model<IProject>('Project', projectSchema);