import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { TeamsList } from './TeamsList';
import { AddTeamModal } from './AddTeamModal';
import toast from 'react-hot-toast';

const initialTeams = [
  {
    id: 1,
    name: 'Project Management',
    department: 'pm',
    members: [
      {
        id: 1,
        name: 'Sarah Lead',
        email: 'sarah@dsm-llc.com',
        role: 'team_lead',
        status: 'active'
      }
    ]
  },
  {
    id: 2,
    name: 'Engineering Team',
    department: 'eng',
    members: [
      {
        id: 2,
        name: 'Mike Engineer',
        email: 'mike@dsm-llc.com',
        role: 'team_lead',
        status: 'active'
      }
    ]
  },
  {
    id: 3,
    name: 'Security Team',
    department: 'sec',
    members: [
      {
        id: 3,
        name: 'Alice Freeman',
        email: 'alice@dsm-llc.com',
        role: 'team_lead',
        status: 'active'
      }
    ]
  },
  {
    id: 4,
    name: 'Development Team',
    department: 'dev',
    members: [
      {
        id: 4,
        name: 'Bob Developer',
        email: 'bob@dsm-llc.com',
        role: 'team_lead',
        status: 'active'
      }
    ]
  }
];

export function TeamManagement() {
  const [teams, setTeams] = useState(initialTeams);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const handleAddTeam = (newTeam) => {
    setTeams([...teams, { ...newTeam, id: Date.now() }]);
    toast.success('Team created successfully');
  };

  const handleUpdateTeam = (updatedTeam) => {
    setTeams(teams.map(team => 
      team.id === updatedTeam.id ? updatedTeam : team
    ));
    toast.success('Team updated successfully');
  };

  const handleDeleteTeam = (teamId) => {
    setTeams(teams.filter(team => team.id !== teamId));
    toast.success('Team deleted successfully');
  };

  const filteredTeams = selectedDepartment === 'all' 
    ? teams 
    : teams.filter(team => team.department === selectedDepartment);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Team Management</h2>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-gray-900 dark:text-white text-sm"
            >
              <option value="all">All Departments</option>
              <option value="pm">Project Management</option>
              <option value="eng">Engineering</option>
              <option value="sec">Security</option>
              <option value="dev">Development</option>
            </select>
          </div>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary hover:bg-primary-light text-white"
          >
            Create Team
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <TeamsList 
          teams={filteredTeams}
          onUpdate={handleUpdateTeam}
          onDelete={handleDeleteTeam}
        />
      </CardContent>

      <AddTeamModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTeam}
      />
    </Card>
  );
}