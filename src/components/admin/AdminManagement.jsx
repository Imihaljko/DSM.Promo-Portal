import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import clsx from 'clsx';
import toast from 'react-hot-toast';

const initialSettings = {
  companyName: 'DSM.Promo',
  emailDomain: 'dsm.promo',
  security: {
    passwordPolicy: {
      minLength: 12,
      requireNumbers: true,
      requireSymbols: true,
      requireUppercase: true,
      expiryDays: 90
    },
    twoFactorAuth: {
      required: true,
      gracePeridDays: 7
    },
    sessionTimeout: 30, // minutes
    maxLoginAttempts: 5
  },
  ticketing: {
    categories: ['Bug', 'Feature Request', 'Support', 'Other'],
    priorities: ['Low', 'Medium', 'High', 'Critical'],
    autoAssignment: {
      enabled: true,
      roundRobin: true
    },
    sla: {
      critical: 4, // hours
      high: 8,
      medium: 24,
      low: 48
    }
  },
  timeTracking: {
    minimumInterval: 15, // minutes
    roundingMethod: 'nearest',
    requireNotes: true,
    categories: ['Development', 'Meetings', 'Support', 'Administrative']
  },
  notifications: {
    email: {
      ticketAssigned: true,
      ticketUpdated: true,
      timeSheetDue: true,
      securityAlerts: true
    },
    inApp: {
      ticketAssigned: true,
      ticketUpdated: true,
      timeSheetDue: true,
      securityAlerts: true
    }
  }
};

export function AdminManagement() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    // In a real app, this would make an API call
    toast.success('Settings saved successfully');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Company Name
        </label>
        <input
          type="text"
          value={settings.companyName}
          onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email Domain
        </label>
        <input
          type="text"
          value={settings.emailDomain}
          onChange={(e) => setSettings({ ...settings, emailDomain: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white"
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Password Policy</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.security.passwordPolicy.requireNumbers}
              onChange={(e) => setSettings({
                ...settings,
                security: {
                  ...settings.security,
                  passwordPolicy: {
                    ...settings.security.passwordPolicy,
                    requireNumbers: e.target.checked
                  }
                }
              })}
              className="checkbox-custom"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Require numbers</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.security.passwordPolicy.requireSymbols}
              onChange={(e) => setSettings({
                ...settings,
                security: {
                  ...settings.security,
                  passwordPolicy: {
                    ...settings.security.passwordPolicy,
                    requireSymbols: e.target.checked
                  }
                }
              })}
              className="checkbox-custom"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Require symbols</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth.required}
              onChange={(e) => setSettings({
                ...settings,
                security: {
                  ...settings.security,
                  twoFactorAuth: {
                    ...settings.security.twoFactorAuth,
                    required: e.target.checked
                  }
                }
              })}
              className="checkbox-custom"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Require 2FA for all users</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Session Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => setSettings({
                ...settings,
                security: {
                  ...settings.security,
                  sessionTimeout: parseInt(e.target.value)
                }
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Max Login Attempts
            </label>
            <input
              type="number"
              value={settings.security.maxLoginAttempts}
              onChange={(e) => setSettings({
                ...settings,
                security: {
                  ...settings.security,
                  maxLoginAttempts: parseInt(e.target.value)
                }
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTicketingSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Categories & Priorities</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Categories
            </label>
            <textarea
              value={settings.ticketing.categories.join('\n')}
              onChange={(e) => setSettings({
                ...settings,
                ticketing: {
                  ...settings.ticketing,
                  categories: e.target.value.split('\n').filter(Boolean)
                }
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Priorities
            </label>
            <textarea
              value={settings.ticketing.priorities.join('\n')}
              onChange={(e) => setSettings({
                ...settings,
                ticketing: {
                  ...settings.ticketing,
                  priorities: e.target.value.split('\n').filter(Boolean)
                }
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white"
              rows={4}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Auto-Assignment</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.ticketing.autoAssignment.enabled}
              onChange={(e) => setSettings({
                ...settings,
                ticketing: {
                  ...settings.ticketing,
                  autoAssignment: {
                    ...settings.ticketing.autoAssignment,
                    enabled: e.target.checked
                  }
                }
              })}
              className="checkbox-custom"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Enable auto-assignment</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.ticketing.autoAssignment.roundRobin}
              onChange={(e) => setSettings({
                ...settings,
                ticketing: {
                  ...settings.ticketing,
                  autoAssignment: {
                    ...settings.ticketing.autoAssignment,
                    roundRobin: e.target.checked
                  }
                }
              })}
              className="checkbox-custom"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Use round-robin assignment</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">SLA Settings (hours)</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(settings.ticketing.sla).map(([priority, hours]) => (
            <div key={priority}>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1 capitalize">
                {priority}
              </label>
              <input
                type="number"
                value={hours}
                onChange={(e) => setSettings({
                  ...settings,
                  ticketing: {
                    ...settings.ticketing,
                    sla: {
                      ...settings.ticketing.sla,
                      [priority]: parseInt(e.target.value)
                    }
                  }
                })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTimeTrackingSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Time Entry Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Minimum Interval (minutes)
            </label>
            <input
              type="number"
              value={settings.timeTracking.minimumInterval}
              onChange={(e) => setSettings({
                ...settings,
                timeTracking: {
                  ...settings.timeTracking,
                  minimumInterval: parseInt(e.target.value)
                }
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Rounding Method
            </label>
            <select
              value={settings.timeTracking.roundingMethod}
              onChange={(e) => setSettings({
                ...settings,
                timeTracking: {
                  ...settings.timeTracking,
                  roundingMethod: e.target.value
                }
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white"
            >
              <option value="nearest">Nearest</option>
              <option value="up">Round Up</option>
              <option value="down">Round Down</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Categories</h3>
        <textarea
          value={settings.timeTracking.categories.join('\n')}
          onChange={(e) => setSettings({
            ...settings,
            timeTracking: {
              ...settings.timeTracking,
              categories: e.target.value.split('\n').filter(Boolean)
            }
          })}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white"
          rows={4}
        />
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.timeTracking.requireNotes}
            onChange={(e) => setSettings({
              ...settings,
              timeTracking: {
                ...settings.timeTracking,
                requireNotes: e.target.checked
              }
            })}
            className="checkbox-custom"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Require notes for time entries</span>
        </label>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Email Notifications</h3>
        <div className="space-y-3">
          {Object.entries(settings.notifications.email).map(([key, enabled]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    email: {
                      ...settings.notifications.email,
                      [key]: e.target.checked
                    }
                  }
                })}
                className="checkbox-custom"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">In-App Notifications</h3>
        <div className="space-y-3">
          {Object.entries(settings.notifications.inApp).map(([key, enabled]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    inApp: {
                      ...settings.notifications.inApp,
                      [key]: e.target.checked
                    }
                  }
                })}
                className="checkbox-custom"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Admin Management</h2>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border-b border-gray-100 dark:border-gray-800">
          <nav className="flex gap-4">
            {['general', 'security', 'ticketing', 'timeTracking', 'notifications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                )}
              >
                {tab.replace(/([A-Z])/g, ' $1').split(' ').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-6">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'ticketing' && renderTicketingSettings()}
          {activeTab === 'timeTracking' && renderTimeTrackingSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
        </div>
      </CardContent>
    </Card>
  );
}