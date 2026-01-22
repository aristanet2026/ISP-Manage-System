
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { UserManagement } from './components/UserManagement';
import { NetworkMonitoring } from './components/NetworkMonitoring';
import { Billing } from './components/Billing';
import { GeminiAssistant } from './components/GeminiAssistant';
import { Settings } from './components/Settings';
import { Automation } from './components/Automation';
import { UserStatus, ConnectionType, ISPUser } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  // Close sidebar on mobile resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock initial users
  const [users, setUsers] = useState<ISPUser[]>([
    {
      id: '1',
      username: 'john_doe',
      connectionType: ConnectionType.PPPOE,
      planId: 'plan-1',
      status: UserStatus.ONLINE,
      uptime: '2d 4h 12m',
      downloaded: '45.2 GB',
      uploaded: '5.1 GB',
      expirationDate: '2023-12-31',
      ipAddress: '192.168.10.50',
      macAddress: '00:1B:44:11:3A:B7'
    },
    {
      id: '2',
      username: 'jane_smith',
      connectionType: ConnectionType.HOTSPOT,
      planId: 'plan-2',
      status: UserStatus.OFFLINE,
      uptime: '-',
      downloaded: '12.8 GB',
      uploaded: '1.2 GB',
      expirationDate: '2023-11-15',
      ipAddress: '10.5.50.12',
      macAddress: 'BC:5F:F4:9A:22:11'
    },
    {
      id: '3',
      username: 'corp_office',
      connectionType: ConnectionType.STATIC,
      planId: 'plan-3',
      status: UserStatus.ONLINE,
      uptime: '15d 1h 5m',
      downloaded: '890.5 GB',
      uploaded: '120.4 GB',
      expirationDate: '2024-06-30',
      ipAddress: '172.16.0.10',
      macAddress: 'D4:CA:6D:E1:92:44'
    }
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard users={users} />;
      case 'users':
        return <UserManagement users={users} setUsers={setUsers} />;
      case 'monitoring':
        return <NetworkMonitoring />;
      case 'billing':
        return <Billing users={users} />;
      case 'automation':
        return <Automation />;
      case 'ai':
        return <GeminiAssistant />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard users={users} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
      />
      
      <main className={`flex-1 transition-all duration-300 w-full overflow-hidden ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <i className="fa-solid fa-bars"></i>
            </button>
            <h2 className="text-lg md:text-xl font-bold text-slate-800 capitalize">{activeTab.replace('-', ' ')}</h2>
          </div>
          <div className="flex items-center gap-2 md:gap-4 text-slate-600">
            <div className="hidden lg:flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              MikroTik Connected
            </div>
            <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
              <i className="fa-solid fa-bell"></i>
            </button>
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              AD
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 max-w-7xl mx-auto overflow-x-hidden">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
