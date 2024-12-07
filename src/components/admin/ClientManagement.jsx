import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

const initialClients = [
  {
    id: 1,
    name: 'Acme Corp',
    contactName: 'John Doe',
    email: 'john@acme.com',
    status: 'active'
  },
  {
    id: 2,
    name: 'TechStart Inc',
    contactName: 'Jane Smith',
    email: 'jane@techstart.com',
    status: 'active'
  }
];

export function ClientManagement() {
  const [clients, setClients] = useState(initialClients);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Client Management</h2>
          <div className="flex justify-end">
            <Button className="bg-primary hover:bg-primary-light text-white">
              Add Client
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clients.map(client => (
            <div 
              key={client.id}
              className="p-4 rounded-lg border border-gray-100 dark:border-gray-800"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{client.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Contact: {client.contactName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email: {client.email}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}