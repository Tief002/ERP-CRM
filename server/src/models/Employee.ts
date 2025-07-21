import mongoose, { Document, Schema } from 'mongoose';

export interface IEmployee extends Document {
  userId: mongoose.Types.ObjectId;
  employeeId: string;
  position: string;
  department: string;
  manager?: mongoose.Types.ObjectId;
  hireDate: Date;
  salary: {
    base: number;
    currency: string;
    frequency: 'monthly' | 'annual';
  };
  benefits: {
    healthInsurance: boolean;
    lifeInsurance: boolean;
    retirement: boolean;
    vacationDays: number;
    sickDays: number;
  };
  bankDetails: {
    accountNumber: string;
    bankName: string;
    routingNumber: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };
  workSchedule: {
    hoursPerWeek: number;
    workDays: string[];
    startTime: string;
    endTime: string;
  };
  status: 'active' | 'on_leave' | 'terminated';
  terminationDate?: Date;
  terminationReason?: string;
  documents: {
    contract?: string;
    idCopy?: string;
    resumeCV?: string;
    certifications?: string[];
  };
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const employeeSchema = new Schema<IEmployee>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  },
  hireDate: {
    type: Date,
    required: true,
  },
  salary: {
    base: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'EUR',
    },
    frequency: {
      type: String,
      enum: ['monthly', 'annual'],
      default: 'monthly',
    },
  },
  benefits: {
    healthInsurance: {
      type: Boolean,
      default: false,
    },
    lifeInsurance: {
      type: Boolean,
      default: false,
    },
    retirement: {
      type: Boolean,
      default: false,
    },
    vacationDays: {
      type: Number,
      default: 25,
    },
    sickDays: {
      type: Number,
      default: 10,
    },
  },
  bankDetails: {
    accountNumber: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    routingNumber: {
      type: String,
      required: true,
    },
  },
  emergencyContact: {
    name: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: String,
  },
  workSchedule: {
    hoursPerWeek: {
      type: Number,
      default: 35,
    },
    workDays: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    }],
    startTime: {
      type: String,
      default: '09:00',
    },
    endTime: {
      type: String,
      default: '17:00',
    },
  },
  status: {
    type: String,
    enum: ['active', 'on_leave', 'terminated'],
    default: 'active',
  },
  terminationDate: Date,
  terminationReason: String,
  documents: {
    contract: String,
    idCopy: String,
    resumeCV: String,
    certifications: [String],
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Index pour la recherche
employeeSchema.index({ employeeId: 1 });
employeeSchema.index({ department: 1 });
employeeSchema.index({ position: 1 });
employeeSchema.index({ status: 1 });
employeeSchema.index({ hireDate: 1 });

export const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);