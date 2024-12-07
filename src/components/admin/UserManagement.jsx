import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { UsersList } from './UsersList';
import { AddUserModal } from './AddUserModal';
import toast from 'react-hot-toast';

const initialUsers = [
  {
    id: 1,
    name: 'John Admin',
    email: 'john@dsm-llc.com',
    role: 'admin',
    status: 'active',
    permissions: {
      canManageUsers: true,
      canManageTeams: true,
      canViewReports: true,
      canManageCampaigns: true
    }
  },
  {
    id: 2,
    name: 'Sarah Lead',
    email: 'sarah@dsm-llc.com',
    role: 'team_lead',
    department: 'dev',
    status: 'active',
    permissions: {
      canManageUsers: false,
      canManageTeams: true,
      canViewReports: true,
      canManageCampaigns: false
    }
  }
];

export function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success('User deleted successfully');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h2>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary hover:bg-primary-light text-white"
          >
            Add User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <UsersList 
          users={users}
          onUpdate={handleUpdateUser}
          onDelete={handleDeleteUser}
        />
      </CardContent>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddUser}
      />
    </Card>
  );
}