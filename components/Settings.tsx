
import React from 'react';

export const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-6">MikroTik API Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Router Host/IP</label>
            <input type="text" defaultValue="192.168.88.1" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">API Port</label>
            <input type="number" defaultValue="8728" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">API User</label>
            <input type="text" defaultValue="admin" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">API Password</label>
            <input type="password" placeholder="••••••••" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" />
          </div>
        </div>
        <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
          <i className="fa-solid fa-link"></i>
          Test Connection
        </button>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-6">RADIUS Server Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">RADIUS Host</label>
            <input type="text" defaultValue="localhost" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Shared Secret</label>
            <input type="password" defaultValue="testing123" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
