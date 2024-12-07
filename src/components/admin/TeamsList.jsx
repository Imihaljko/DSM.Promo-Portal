import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { EditTeamModal } from './EditTeamModal';
import clsx from 'clsx';

export function TeamsList({ teams, onUpdate, onDelete }) {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const getDepartmentColor = (department) => {
    switch (department) {
      case 'pm':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'eng':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'sec':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'dev':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getDepartmentName = (department) => {
    switch (department) {
      case 'pm': return 'Project Management';
      case 'eng': return 'Engineering';
      case 'sec': return 'Security';
      case 'dev': return 'Development';
      default: return department.toUpperCase();
    }
  };

  return (
    <>
      <div className="space-y-4">
        {teams.map(team => (
          <div 
            key={team.id}
            className="p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{team.name}</h3>
                <span className={clsx(
                  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1',
                  getDepartmentColor(team.department)
                )}>
                  {getDepartmentName(team.department)}
                </span>
              </div>
              <Menu as="div" className="relative">
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
                          onClick={() => setSelectedTeam(team)}
                          className={clsx(
                            'flex w-full items-center px-3 py-2 text-sm rounded-md',
                            active ? 'bg-gray-100 dark:bg-dark-hover' : ''
                          )}
                        >
                          Edit Team
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => onDelete(team.id)}
                          className={clsx(
                            'flex w-full items-center px-3 py-2 text-sm rounded-md text-red-600 dark:text-red-400',
                            active ? 'bg-gray-100 dark:bg-dark-hover' : ''
                          )}
                        >
                          Delete Team
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
            </div>

            <div className="space-y-2">
              {team.members.map(member => (
                <div 
                  key={member.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-dark-hover"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{member.email}</p>
                    </div>
                  </div>
                  <span className={clsx(
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                    member.role === 'team_lead' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  )}>
                    {member.role === 'team_lead' ? 'Team Lead' : 'Member'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedTeam && (
        <EditTeamModal
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
          onUpdate={(updatedTeam) => {
            onUpdate(updatedTeam);
            setSelectedTeam(null);
          }}
        />
      )}
    </>
  );
}