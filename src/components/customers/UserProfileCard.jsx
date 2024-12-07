import React from 'react';
import { format } from 'date-fns';
import { Card } from '../ui/Card';
import clsx from 'clsx';

export function UserProfileCard({ user, onClose }) {
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'team_lead':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'team_member':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'client':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getTitle = (role, department) => {
    if (role === 'client') return 'Client';
    if (role === 'admin') return 'Administrator';
    if (role === 'team_lead') return `${department?.toUpperCase()} Team Lead`;
    return `${department?.toUpperCase()} Team Member`;
  };

  const getPermissionLevel = (permissions) => {
    if (!permissions) return 'Basic Access';
    const permissionCount = Object.values(permissions).filter(Boolean).length;
    if (permissionCount === 0) return 'Basic Access';
    if (permissionCount <= 2) return 'Limited Access';
    if (permissionCount <= 3) return 'Standard Access';
    return 'Full Access';
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="relative">
        {/* Header/Banner */}
        <div className="h-32 bg-gradient-to-r from-primary to-primary-light rounded-t-xl" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Avatar */}
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 rounded-full border-4 border-white dark:border-dark-card bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-semibold text-gray-500 dark:text-gray-400">
                {user.name.charAt(0)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-16">
        {/* Basic Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {user.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          
          <div className="mt-3 space-y-2">
            <span className={clsx(
              'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
              getRoleBadgeColor(user.role)
            )}>
              {getTitle(user.role, user.department)}
            </span>
            
            {user.role !== 'client' && (
              <span className="block text-sm text-gray-500 dark:text-gray-400">
                {getPermissionLevel(user.permissions)}
              </span>
            )}
          </div>
        </div>

        {/* Stats/Details */}
        {user.role === 'client' ? (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-hover">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${user.spent?.toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-hover">
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Order</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {format(new Date(user.lastOrder), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            {user.permissions && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Permissions
                </h3>
                <div className="space-y-2">
                  {Object.entries(user.permissions).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <span className={clsx(
                        'w-2 h-2 rounded-full',
                        value ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                      )} />
                      <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Status */}
        <div className="flex items-center gap-2">
          <span className={clsx(
            'w-2 h-2 rounded-full',
            user.status === 'active' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
          )} />
          <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
            {user.status}
          </span>
        </div>
      </div>
    </Card>
  );
}