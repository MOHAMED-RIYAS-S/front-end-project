import React from 'react';
import { UsersIcon } from './Icon';

function initials(name='Admin'){
  return name.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase();
}

export default function ProfileCard({ employee }){
  const name = (employee && employee.name) || 'Admin';
  return (
    <div className="profile-card">
      <div className="profile-avatar">{initials(name)}</div>
      <div style={{ marginLeft: 10 }}>
        <div className="profile-name">{name}</div>
        <div className="profile-role">Manager</div>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <button className="secondary" aria-label="profile-actions"><UsersIcon size={16} /></button>
      </div>
    </div>
  );
}
