import React from 'react';
import clsx from 'clsx';

const defaultAvatars = {
  customer: [
    '/avatars/customer-1.png',
    '/avatars/customer-2.png',
    '/avatars/customer-3.png',
    '/avatars/customer-4.png'
  ],
  pm: [
    '/avatars/pm-1.png',
    '/avatars/pm-2.png',
    '/avatars/pm-3.png'
  ],
  dev: [
    '/avatars/dev-1.png',
    '/avatars/dev-2.png',
    '/avatars/dev-3.png'
  ],
  eng: [
    '/avatars/eng-1.png',
    '/avatars/eng-2.png',
    '/avatars/eng-3.png'
  ],
  sec: [
    '/avatars/sec-1.png',
    '/avatars/sec-2.png',
    '/avatars/sec-3.png'
  ]
};

const defaultIcons = {
  customer: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 256 256">
      <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.83,40.31,185.71,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
    </svg>
  ),
  pm: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 256 256">
      <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM184,96a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,96Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,128Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,160Z" />
    </svg>
  ),
  dev: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 256 256">
      <path d="M71.68,97.22,34.74,128l36.94,30.78a8,8,0,1,1-10.24,12.27l-48-40a8,8,0,0,1,0-12.27l48-40A8,8,0,1,1,71.68,97.22Zm176.56,28.56-48-40a8,8,0,1,0-10.24,12.27L226.94,128l-36.94,30.78a8,8,0,1,0,10.24,12.27l48-40a8,8,0,0,0,0-12.27Zm-82.12-89.91a8,8,0,0,0-10.24,4.8l-64,176a8,8,0,0,0,4.8,10.25A8.14,8.14,0,0,0,99,228a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,166.12,35.87Z" />
    </svg>
  ),
  eng: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 256 256">
      <path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm44.08-91.66-48-32a8,8,0,0,0-12.16,6.82v64a8,8,0,0,0,12.16,6.82l48-32a8,8,0,0,0,0-13.64ZM128,163.16V92.84L159.32,128Z" />
    </svg>
  ),
  sec: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 256 256">
      <path d="M208,40H48A16,16,0,0,0,32,56V200a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V56A16,16,0,0,0,208,40Zm0,160H48V56H208V200Zm-48-56a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16h48A8,8,0,0,1,160,144Zm32-48a8,8,0,0,1-8,8H72a8,8,0,0,1,0-16H184A8,8,0,0,1,192,96Z" />
    </svg>
  )
};

export function AvatarPicker({ 
  type = 'customer', 
  selectedAvatar, 
  onSelect,
  className 
}) {
  const avatars = defaultAvatars[type] || defaultAvatars.customer;
  const defaultIcon = defaultIcons[type] || defaultIcons.customer;

  return (
    <div className={clsx('space-y-4', className)}>
      <div className="flex items-center gap-4">
        <div className={clsx(
          'w-16 h-16 rounded-full flex items-center justify-center',
          selectedAvatar ? 'bg-gray-100 dark:bg-gray-800' : 'bg-primary/10 dark:bg-primary/20'
        )}>
          {selectedAvatar ? (
            <img 
              src={selectedAvatar} 
              alt="Selected avatar" 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="text-primary">
              {defaultIcon}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Profile Picture
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Choose an avatar or use the default icon
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => onSelect(null)}
          className={clsx(
            'aspect-square rounded-lg flex items-center justify-center',
            'border-2 transition-colors',
            !selectedAvatar
              ? 'border-primary bg-primary/10 dark:bg-primary/20'
              : 'border-transparent bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          )}
        >
          <div className="text-primary">
            {defaultIcon}
          </div>
        </button>

        {avatars.map((avatar, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(avatar)}
            className={clsx(
              'aspect-square rounded-lg overflow-hidden',
              'border-2 transition-colors',
              selectedAvatar === avatar
                ? 'border-primary'
                : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            <img 
              src={avatar} 
              alt={`Avatar option ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}