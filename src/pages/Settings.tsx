import React, { useState } from 'react';
import { StatusBadge } from '../components/ui/StatusBadge';
import { team } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

export const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState({ deadlines: true, dataUpdates: true, aiInsights: false, weeklyDigest: true });
  const { company, user, setUser } = useAppContext();

  return (
    <div className="w-full">
      <div className="pb-20 px-4 md:px-8 pt-8 max-w-[1000px] mx-auto">
        <header className="mb-12 border-b border-outline-variant/30 pb-8">
          <h1 className="text-4xl font-headline italic text-primary mb-3">Settings</h1>
          <p className="text-on-surface-variant text-sm max-w-xl">Manage your company profile, team, and notification preferences.</p>
        </header>

        {/* Company Profile */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-primary mb-6">Company Profile</h2>
          <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">Company Name</label>
                <input className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary transition-all py-2.5 px-0 text-primary font-bold text-base outline-none" type="text" defaultValue={company.name} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">Sector</label>
                <select className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary transition-all py-2.5 px-0 text-primary font-bold text-base outline-none appearance-none cursor-pointer">
                  <option>Manufacturing</option>
                  <option>Mining & Resources</option>
                  <option>Agriculture</option>
                  <option>Financial Services</option>
                  <option>Energy</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">Location</label>
                <input className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary transition-all py-2.5 px-0 text-primary font-bold text-base outline-none" type="text" defaultValue={company.country} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant block mb-2">Employees</label>
                <input className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary transition-all py-2.5 px-0 text-primary font-bold text-base outline-none" type="text" defaultValue={company.employees} />
              </div>
              <div className="md:col-span-2 pt-4 flex justify-end">
                <button type="button" className="px-8 py-3 bg-primary-container text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer outline-none">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Team Management */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-primary">Team Management</h2>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-lowest border border-outline-variant/20 text-xs font-bold uppercase tracking-widest text-primary hover:border-primary/30 transition-all cursor-pointer outline-none">
              <span className="material-symbols-outlined text-[14px]">person_add</span>
              Invite Member
            </button>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
            <table className="w-full text-left">
              <thead><tr className="text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant border-b border-outline-variant/15">
                <th className="px-6 py-3">Member</th><th className="px-6 py-3">Role</th><th className="px-6 py-3">Email</th><th className="px-6 py-3">Status</th>
              </tr></thead>
              <tbody>
                <tr className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{user.firstName[0]}{user.lastName[0]}</div>
                      <span className="text-sm font-bold text-primary">{user.firstName} {user.lastName} (You)</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold uppercase tracking-widest bg-primary/8 text-primary px-3 py-1 rounded-full">{user.role}</span></td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant">{user.firstName.toLowerCase()}.{user.lastName.toLowerCase()}@company.com</td>
                  <td className="px-6 py-4"><StatusBadge status="completed" size="sm" /></td>
                </tr>
                {team.map((m, i) => (
                <tr key={i} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{m.initials}</div>
                      <span className="text-sm font-bold text-primary">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold uppercase tracking-widest bg-primary/8 text-primary px-3 py-1 rounded-full">{m.role}</span></td>
                  <td className="px-6 py-4 text-xs text-on-surface-variant">{m.email}</td>
                  <td className="px-6 py-4"><StatusBadge status={m.status} size="sm" /></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        {/* Notifications */}
        <section>
          <h2 className="text-xl font-bold text-primary mb-6">Notifications</h2>
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 space-y-5">
            {[
              { key: 'deadlines' as const, label: 'Deadline Reminders', desc: 'Get notified about upcoming framework deadlines' },
              { key: 'dataUpdates' as const, label: 'Data Updates', desc: 'When new data is uploaded or verified' },
              { key: 'aiInsights' as const, label: 'AI Insights', desc: 'Vera AI suggestions and gap alerts' },
              { key: 'weeklyDigest' as const, label: 'Weekly Digest', desc: 'Summary of ESG activity and progress' },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-bold text-primary">{n.label}</p>
                  <p className="text-xs text-on-surface-variant">{n.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
                  className="outline-none cursor-pointer active:scale-90 transition-transform"
                >
                  <div className={`w-12 h-7 rounded-full flex items-center px-1 shadow-inner transition-colors duration-200 ${notifications[n.key] ? 'bg-secondary' : 'bg-outline-variant/30'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full transition-all duration-200 shadow-md ${notifications[n.key] ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Preferences */}
        <section className="mt-14">
          <h2 className="text-xl font-bold text-primary mb-6">Preferences</h2>
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-primary">Language</p>
                <p className="text-xs text-on-surface-variant">Choose your preferred language for the interface</p>
              </div>
              <select 
                value={user.language}
                onChange={(e) => setUser({ ...user, language: e.target.value as 'en'|'pt' })}
                className="bg-transparent border-0 border-b-2 border-outline-variant focus:border-primary transition-all py-2 text-primary font-bold text-sm outline-none cursor-pointer"
              >
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-outline-variant/20 text-center">
          <p className="font-headline italic text-primary/40 text-lg">Vera by Compass</p>
          <p className="text-[10px] text-on-surface-variant mt-2 uppercase tracking-widest">Find Your Way · © 2025 Compass Advisory</p>
        </footer>
      </div>
    </div>
  );
};
