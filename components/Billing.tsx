
import React from 'react';
import { ISPUser } from '../types';

export const Billing: React.FC<{ users: ISPUser[] }> = ({ users }) => {
  const plans = [
    { name: 'Lite Home', speed: '5Mbps', price: 15, count: 145 },
    { name: 'Family Pro', speed: '20Mbps', price: 35, count: 422 },
    { name: 'Business Plus', speed: '100Mbps', price: 120, count: 88 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100">
          <p className="text-indigo-100 font-medium mb-1">Total Receivables</p>
          <h3 className="text-4xl font-bold mb-6">$18,450.00</h3>
          <div className="flex justify-between text-sm">
            <span>Collected: $12,200</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-lg">Pending: $6,250</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm col-span-2">
          <h3 className="font-bold text-slate-800 mb-6">Plan Distribution</h3>
          <div className="flex items-end gap-2 h-32">
            {plans.map((p, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-slate-100 rounded-lg relative group overflow-hidden" style={{height: `${(p.count / 500) * 100}%`}}>
                  <div className="absolute inset-0 bg-indigo-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-[10px] text-slate-500 font-bold uppercase truncate w-full text-center">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Recent Invoices</h3>
          <button className="text-indigo-600 font-bold text-sm hover:underline">View All</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Invoice ID</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Date</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[1,2,3,4,5].map(i => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm font-mono text-slate-600">#INV-2023-00{i}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-800">Customer_{i*10}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-800">$25.00</td>
                <td className="px-6 py-4 text-sm text-slate-500">2023-11-2{i}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${i % 3 === 0 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                    {i % 3 === 0 ? 'Unpaid' : 'Paid'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
