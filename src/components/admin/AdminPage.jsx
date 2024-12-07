import React from 'react';
import { UserManagement } from './UserManagement';
import { TeamManagement } from './TeamManagement';
import { ClientManagement } from './ClientManagement';
import { AdminManagement } from './AdminManagement';

export function AdminPage() {
  return (
    <main className="flex-1 min-w-0 overflow-auto">
      <div className="max-w-[1440px] mx-auto animate-fade-in">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <h1 className="text-gray-900 dark:text-white text-2xl md:text-3xl font-bold">Admin Portal</h1>
        </div>

        <div className="p-4 space-y-8">
          <UserManagement />
          <TeamManagement />
          <ClientManagement />
          <AdminManagement />
        </div>
      </div>
    </main>
  );
}