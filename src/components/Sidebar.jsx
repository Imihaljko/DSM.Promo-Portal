import React from 'react';
import { House, UsersThree, ChatDots, Megaphone, ChartPie } from './Icons';
import clsx from 'clsx';

const menuItems = [
  { id: 'dashboard', icon: House, text: 'Home' },
  { id: 'customers', icon: UsersThree, text: 'Customers' },
  { id: 'conversations', icon: ChatDots, text: 'Conversations' },
  { id: 'campaigns', icon: Megaphone, text: 'Campaigns' },
  { id: 'reporting', icon: ChartPie, text: 'Reporting' },
  { 
    id: 'admin', 
    icon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
        <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.49A107.71,107.71,0,0,0,73.89,34.49a8,8,0,0,0-3.94,6L67.31,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.93,107.21,107.21,0,0,0-10.88,26.25,8,8,0,0,0,1.48,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.49,107.71,107.71,0,0,0,26.25-10.87,8,8,0,0,0,3.94-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.93,107.21,107.21,0,0,0,10.88-26.25,8,8,0,0,0-1.48-7.06ZM128,168A40,40,0,1,1,168,128,40,40,0,0,1,128,168Z" />
      </svg>
    ),
    text: 'Admin Portal'
  }
];

const QuickAccessItem = ({ image, name, lastSeen, amount, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-4 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors duration-200"
  >
    <div className="flex items-center gap-4 flex-1">
      <div
        className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 border border-gray-100 dark:border-gray-700"
        style={{ backgroundImage: `url("${image}")` }}
      />
      <div className="flex flex-col min-w-0">
        <p className="text-gray-900 dark:text-white text-sm font-medium truncate">{name}</p>
        <p className="text-gray-500 dark:text-gray-400 text-xs">Last seen {lastSeen}</p>
      </div>
    </div>
    <div className="shrink-0">
      <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">${amount}</p>
    </div>
  </button>
);

export default function Sidebar({ isOpen, onClose, currentPage, onMenuItemClick }) {
  return (
    <aside className={clsx(
      'fixed inset-y-0 left-0 z-40 w-80 bg-white dark:bg-dark-card border-r border-gray-100 dark:border-gray-800 lg:static transform transition-transform duration-300 ease-in-out',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    )}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-1 p-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onMenuItemClick(item.id)}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200',
                  currentPage === item.id
                    ? 'bg-primary bg-opacity-15 text-primary dark:bg-opacity-20'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover'
                )}
              >
                <item.icon />
                <span className="text-sm font-medium">{item.text}</span>
              </button>
            ))}
          </nav>
          
          <div className="border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-gray-900 dark:text-white text-sm font-semibold px-4 py-3">
              Quick access
            </h3>
            <div className="space-y-1">
              <QuickAccessItem
                image="https://cdn.usegalileo.ai/stability/117a7a12-7704-4917-9139-4a3f76c42e78.png"
                name="Alice Freeman"
                lastSeen="2 days ago"
                amount={200}
                onClick={() => onMenuItemClick('customers')}
              />
              <QuickAccessItem
                image="https://cdn.usegalileo.ai/stability/d4e7d763-28f3-4af2-bc57-a26db12c522b.png"
                name="Bob Smith"
                lastSeen="5 days ago"
                amount={100}
                onClick={() => onMenuItemClick('customers')}
              />
              <QuickAccessItem
                image="https://cdn.usegalileo.ai/stability/e9fdb59b-64bb-4239-8e52-f71e0cfb538e.png"
                name="Charlie Brown"
                lastSeen="7 days ago"
                amount={50}
                onClick={() => onMenuItemClick('customers')}
              />
              <QuickAccessItem
                image="https://cdn.usegalileo.ai/stability/1af7ccee-eb75-4af5-b80e-ee2ec64a79ef.png"
                name="David Jones"
                lastSeen="10 days ago"
                amount={300}
                onClick={() => onMenuItemClick('customers')}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}