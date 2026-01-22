
import React from 'react';

export const NetworkMonitoring: React.FC = () => {
  const interfaces = [
    { name: 'ether1 (WAN)', status: 'Active', speed: '1 Gbps', tx: '450 Mbps', rx: '89 Mbps', errors: 0 },
    { name: 'ether2 (LAN-Bridge)', status: 'Active', speed: '1 Gbps', tx: '12 Mbps', rx: '400 Mbps', errors: 0 },
    { name: 'sfp-plus1 (Uplink)', status: 'Inactive', speed: '10 Gbps', tx: '0 bps', rx: '0 bps', errors: 0 },
    { name: 'wlan1 (AP)', status: 'Active', speed: '300 Mbps', tx: '45 Mbps', rx: '20 Mbps', errors: 12 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-microchip text-indigo-500"></i>
            Real-time Log
          </h3>
          <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs space-y-2 h-64 overflow-y-auto">
            <p className="text-emerald-400">Nov 23 14:22:01 system,info: user john_doe logged in via pppoe</p>
            <p className="text-slate-400">Nov 23 14:21:45 pppoe,debug: pppoe-server: PADI received on ether2</p>
            <p className="text-rose-400">Nov 23 14:20:12 radius,error: timeout while waiting for radius response</p>
            <p className="text-slate-400">Nov 23 14:19:55 hotspot,info: trial_user: logout (keep-alive timeout)</p>
            <p className="text-blue-400">Nov 23 14:18:22 script,info: daily_report: successfully emailed to admin@isp.com</p>
            <p className="text-slate-400">Nov 23 14:17:10 pppoe,info: <pppoe-jane_smith>: connected</p>
            <p className="text-slate-400">Nov 23 14:16:01 system,info: script update check: no updates found</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-network-wired text-indigo-500"></i>
            Interface Traffic
          </h3>
          <div className="space-y-3">
            {interfaces.map((int, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-700">{int.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${int.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'}`}>
                    {int.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-arrow-down text-indigo-500"></i>
                    <span className="text-slate-500">TX:</span>
                    <span className="text-slate-900 font-bold">{int.tx}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-arrow-up text-rose-500"></i>
                    <span className="text-slate-500">RX:</span>
                    <span className="text-slate-900 font-bold">{int.rx}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
