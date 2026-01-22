
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ISPUser, UserStatus } from '../types';

const data = [
  { time: '00:00', download: 400, upload: 240 },
  { time: '04:00', download: 300, upload: 139 },
  { time: '08:00', download: 2000, upload: 980 },
  { time: '12:00', download: 2780, upload: 1908 },
  { time: '16:00', download: 1890, upload: 1480 },
  { time: '20:00', download: 2390, upload: 1500 },
  { time: '23:59', download: 3490, upload: 2300 },
];

export const Dashboard: React.FC<{ users: ISPUser[] }> = ({ users }) => {
  const onlineCount = users.filter(u => u.status === UserStatus.ONLINE).length;
  const offlineCount = users.filter(u => u.status === UserStatus.OFFLINE).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Connections" value={onlineCount} icon="fa-signal" color="bg-green-500" />
        <StatCard title="Total Customers" value={users.length} icon="fa-users" color="bg-indigo-500" />
        <StatCard title="Monthly Revenue" value="$4,250" icon="fa-wallet" color="bg-emerald-500" />
        <StatCard title="Bandwidth Usage" value="2.4 Gbps" icon="fa-bolt" color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Traffic Analysis (Last 24h)</h3>
            <div className="flex gap-4 text-sm font-medium">
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-500"></div> Download</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-400"></div> Upload</span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorDl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="download" stroke="#6366f1" fillOpacity={1} fill="url(#colorDl)" strokeWidth={3} />
                <Area type="monotone" dataKey="upload" stroke="#f43f5e" fillOpacity={1} fill="url(#colorUl)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">System Status</h3>
          <div className="space-y-4">
            <StatusItem label="CPU Usage" value="24%" percent={24} color="bg-indigo-500" />
            <StatusItem label="Memory Usage" value="1.2 GB / 4 GB" percent={30} color="bg-blue-500" />
            <StatusItem label="Storage" value="45 GB / 120 GB" percent={40} color="bg-amber-500" />
            <StatusItem label="Radius Auth Pool" value="89% Capacity" percent={89} color="bg-emerald-500" />
            
            <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-sm font-bold text-slate-700 mb-3">Router Details</h4>
              <div className="grid grid-cols-2 gap-y-2 text-xs">
                <span className="text-slate-500">Model</span>
                <span className="text-slate-800 font-medium">CCR2004-1G-12S+2XS</span>
                <span className="text-slate-500">OS Version</span>
                <span className="text-slate-800 font-medium">RouterOS v7.11</span>
                <span className="text-slate-500">Uptime</span>
                <span className="text-slate-800 font-medium">124 days 2h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{title: string, value: string | number, icon: string, color: string}> = ({title, value, icon, color}) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
    <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl`}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

const StatusItem: React.FC<{label: string, value: string, percent: number, color: string}> = ({label, value, percent, color}) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-slate-600 font-medium">{label}</span>
      <span className="text-slate-900 font-bold">{value}</span>
    </div>
    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-500`} style={{width: `${percent}%`}}></div>
    </div>
  </div>
);
