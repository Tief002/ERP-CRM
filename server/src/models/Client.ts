import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  clientId: string;
  type: 'individual' | 'company';
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  company?: {
    name: string;
    industry: string;
    size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
    website?: string;
    siret?: string;
    vatNumber?: string;
  };
  contact: {
    primaryContact: string;
    secondaryContact?: string;
    preferredMethod: 'email' | 'phone' | 'sms';
  };
  status: 'prospect' | 'active' | 'inactive' | 'lost';
  priority: 'low' | 'medium' | 'high' | 'critical';
  source: 'website' | 'referral' | 'social_media' | 'advertising' | 'event' | 'cold_outreach' | 'other';
  assignedTo: mongoose.Types.ObjectId;
  tags: string[];
  notes: string;
  customFields: Map<string, any>;
  lastContactDate?: Date;
  nextContactDate?: Date;
  totalRevenue: number;
  averageOrderValue: number;
  lifetimeValue: number;
  createdAt: Date;
  updatedAt: Date;
}

const clientSchema = new Schema<IClient>({
  clientId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['individual', 'company'],
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      default: 'France',
    },
  },
  company: {
    name: String,
    industry: String,
    size: {
      type: String,
      enum: ['startup', 'small', 'medium', 'large', 'enterprise'],
    },
    website: String,
    siret: String,
    vatNumber: String,
  },
  contact: {
    primaryContact: {
      type: String,
      required: true,
    },
    secondaryContact: String,
    preferredMethod: {
      type: String,
      enum: ['email', 'phone', 'sms'],
      default: 'email',
    },
  },
  status: {
    type: String,
    enum: ['prospect', 'active', 'inactive', 'lost'],
    default: 'prospect',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
  },
  source: {
    type: String,
    enum: ['website', 'referral', 'social_media', 'advertising', 'event', 'cold_outreach', 'other'],
    required: true,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  notes: {
    type: String,
    default: '',
  },
  customFields: {
    type: Map,
    of: Schema.Types.Mixed,
  },
  lastContactDate: Date,
  nextContactDate: Date,
  totalRevenue: {
    type: Number,
    default: 0,
    min: 0,
  },
  averageOrderValue: {
    type: Number,
    default: 0,
    min: 0,
  },
  lifetimeValue: {
    type: Number,
    default: 0,
    min: 0,
  },
}, {
  timestamps: true,
});

// Index pour la recherche
clientSchema.index({ clientId: 1 });
clientSchema.index({ email: 1 });
clientSchema.index({ name: 'text' });
clientSchema.index({ status: 1 });
clientSchema.index({ priority: 1 });
clientSchema.index({ assignedTo: 1 });
clientSchema.index({ tags: 1 });
clientSchema.index({ 'company.name': 'text' });

export const Client = mongoose.model<IClient>('Client', clientSchema);