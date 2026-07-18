import React from 'react';

export function DashboardIcon({size=18}){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="8" height="8" rx="2" stroke="#475569" strokeWidth="1.2"/><rect x="13" y="3" width="8" height="5" rx="2" stroke="#475569" strokeWidth="1.2"/><rect x="13" y="10" width="8" height="11" rx="2" stroke="#475569" strokeWidth="1.2"/><rect x="3" y="13" width="8" height="8" rx="2" stroke="#475569" strokeWidth="1.2"/></svg>
  );
}

export function InboxIcon({size=18}){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 8l9 6 9-6" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
}

export function CalendarIcon({size=18}){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="16" rx="2" stroke="#475569" strokeWidth="1.2"/><path d="M16 3v4M8 3v4M3 11h18" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
}

export function UsersIcon({size=18}){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
}

export default function Icon(){ return null; }
