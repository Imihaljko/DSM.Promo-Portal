import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { EditUserModal } from './EditUserModal';
import clsx from 'clsx';

export function UsersList({ users, onUpdate, onDelete }) {
  const [selectedUser, setSelectedUser] = useState(null);

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

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getPermissionLevel = (permissions) => {
    if (!permissions) return 'Basic Access';
    const permissionCount = Object.values(permissions).filter(Boolean).length;
    if (permissionCount === 0) return 'Basic Access';
    if (permissionCount <= 2) return 'Limited Access';
    if (permissionCount <= 3) return 'Standard Access';
    return 'Full Access';
  };

  const getTitle = (role, department) => {
    if (role === 'client') return 'Client';
    if (role === 'admin') return 'Administrator';
    if (role === 'team_lead') return `${department?.toUpperCase()} Team Lead`;
    return `${department?.toUpperCase()} Team Member`;
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">User</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Role</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Department</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr 
                key={user.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                      <div className="mt-1 flex flex-col">
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {getTitle(user.role, user.department)}
                        </span>
                        <span className={clsx(
                          'text-xs',
                          user.role === 'client' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'
                        )}>
                          {getPermissionLevel(user.permissions)}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={clsx(
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                    getRoleBadgeColor(user.role)
                  )}>
                    {user.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {user.department ? user.department.toUpperCase() : '-'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={clsx(
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                    getStatusBadgeColor(user.status)
                  )}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M112,60a16,16,0,1,1,16,16A16,16,0,0,1,112,60Zm16,52a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,68a16,16,0,1,0,16,16A16,16,0,0,0,128,180Z" />
                      </svg>
                    </Menu.Button>

                    <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 focus:outline-none">
                      <div className="p-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => setSelectedUser(user)}
                              className={clsx(
                                'flex w-full items-center px-3 py-2 text-sm rounded-md',
                                active ? 'bg-gray-100 dark:bg-dark-hover' : ''
                              )}
                            >
                              Edit User
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => onDelete(user.id)}
                              className={clsx(
                                'flex w-full items-center px-3 py-2 text-sm rounded-md text-red-600 dark:text-red-400',
                                active ? 'bg-gray-100 dark:bg-dark-hover' : ''
                              )}
                            >
                              Delete User
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdate={(updatedUser) => {
            onUpdate(updatedUser);
            setSelectedUser(null);
          }}
        />
      )}
    </>
  );
}