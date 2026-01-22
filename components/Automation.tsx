
import React, { useState } from 'react';

export const Automation: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const installScript = `#!/bin/bash
# FreeRADIUS Auto-Installer for ISP-Core Manager
# Target: Ubuntu 22.04 LTS / Debian 11+

echo "--- Updating System ---"
sudo apt update && sudo apt upgrade -y

echo "--- Installing FreeRADIUS and MySQL Support ---"
sudo apt install -y freeradius freeradius-mysql freeradius-utils mariadb-server

echo "--- Configuring MySQL for RADIUS ---"
# Note: In production, use more secure password handling
sudo mysql -e "CREATE DATABASE radius;"
sudo mysql -e "GRANT ALL ON radius.* TO 'radius'@'localhost' IDENTIFIED BY 'radpass';"
sudo mysql radius < /etc/freeradius/3.0/mods-config/sql/main/mysql/schema.sql

echo "--- Enabling SQL Module in FreeRADIUS ---"
sudo ln -s /etc/freeradius/3.0/mods-available/sql /etc/freeradius/3.0/mods-enabled/
sudo sed -i 's/driver = "rlm_sql_null"/driver = "rlm_sql_mysql"/' /etc/freeradius/3.0/mods-available/sql
sudo sed -i 's/dialect = "sqlite"/dialect = "mysql"/' /etc/freeradius/3.0/mods-available/sql

echo "--- Restarting Service ---"
sudo systemctl restart freeradius

echo "--- Installation Complete! ---"
echo "You can now connect ISP-Core Manager to this RADIUS server."
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(installScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">RADIUS Automation</h3>
          <p className="text-indigo-100 max-w-2xl">Deploy a fully configured FreeRADIUS server on your Linux machine with a single script. Integrated with MySQL for user persistence.</p>
        </div>
        <i className="fa-solid fa-bolt absolute -bottom-10 -right-10 text-9xl text-white/10 rotate-12"></i>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
              <i className="fa-solid fa-code"></i>
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Auto-Install Script</h4>
              <p className="text-xs text-slate-500">Copy and run on your server (Ubuntu/Debian)</p>
            </div>
          </div>
          <button 
            onClick={copyToClipboard}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              copied ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
            {copied ? 'Copied!' : 'Copy Script'}
          </button>
        </div>
        
        <div className="p-0 bg-slate-900 overflow-x-auto">
          <pre className="p-6 text-xs md:text-sm font-mono text-emerald-400 leading-relaxed whitespace-pre min-w-[600px]">
            {installScript}
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-circle-info text-blue-500"></i>
            Prerequisites
          </h4>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> Clean Ubuntu 22.04 or Debian 11+ server</li>
            <li className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> Root or Sudo access</li>
            <li className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> Open Port 1812/1813 (UDP)</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-amber-500"></i>
            Security Note
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            This script uses default passwords for setup. After installation, ensure you update the MySQL 'radius' user password and the RADIUS shared secret in <code>/etc/freeradius/3.0/clients.conf</code>.
          </p>
        </div>
      </div>
    </div>
  );
};
