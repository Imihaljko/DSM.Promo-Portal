import React, { useState } from 'react';
import { format } from 'date-fns';
import { CustomerDetailsModal } from './CustomerDetailsModal';
import { UserProfileCard } from './UserProfileCard';
import clsx from 'clsx';

export function CustomerTable({ customers }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showProfileCard, setShowProfileCard] = useState(false);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Customer</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Total Spent</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Last Order</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr 
                key={customer.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedCustomer(customer);
                  setShowProfileCard(true);
                }}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={clsx(
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                    customer.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  )}>
                    {customer.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-gray-900 dark:text-white">${customer.spent.toLocaleString()}</p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(customer.lastOrder), 'MMM d, yyyy')}
                  </p>
                </td>
                <td className="py-3 px-4 text-right">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCustomer(customer);
                      setShowProfileCard(false);
                    }}
                    className="text-primary hover:text-primary-light text-sm font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCustomer && !showProfileCard && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}

      {selectedCustomer && showProfileCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 dark:bg-black/40">
          <UserProfileCard
            user={selectedCustomer}
            onClose={() => {
              setSelectedCustomer(null);
              setShowProfileCard(false);
            }}
          />
        </div>
      )}
    </>
  );
}