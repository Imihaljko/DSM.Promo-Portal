import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: ['admin', 'team_lead', 'team_member', 'client'],
    default: 'team_member'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending'
  },
  department: {
    type: String,
    enum: ['dev', 'eng', 'sec', 'pm'],
    required: function() {
      return this.role === 'team_member' || this.role === 'team_lead';
    }
  },
  permissions: {
    canManageUsers: Boolean,
    canManageTeams: Boolean,
    canViewReports: Boolean,
    canManageCampaigns: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

export default User;