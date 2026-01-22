
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
    { id: 'users', icon: 'fa-users', label: 'Customers' },
    { id: 'monitoring', icon: 'fa-gauge-high', label: 'Monitoring' },
    { id: 'billing', icon: 'fa-file-invoice-dollar', label: 'Billing' },
    { id: 'automation', icon: 'fa-terminal', label: 'Automation' },
    { id: 'ai', icon: 'fa-robot', label: 'AI Assistant' },
    { id: 'settings', icon: 'fa-gears', label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 z-20 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      />
      
      <aside className={`fixed left-0 top-0 h-full bg-slate-900 text-slate-300 transition-all duration-300 z-30 ${isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
            <div className="bg-indigo-500 p-2 rounded-lg shrink-0">
              <i className="fa-solid fa-tower-broadcast text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold text-white whitespace-nowrap">ISP-Core</span>
          </div>
          <button onClick={toggleSidebar} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
            <i className={`fa-solid ${isOpen ? 'fa-angle-left' : 'fa-bars'}`}></i>
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 768) toggleSidebar();
              }}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-6 text-center text-lg`}></i>
              <span className={`font-medium transition-opacity duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 md:hidden'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className={`absolute bottom-0 w-full p-4 border-t border-slate-800 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 hidden md:block'}`}>
          <div className="bg-slate-800 p-4 rounded-xl flex items-center gap-3">
            <img src="https://picsum.photos/40/40" alt="Avatar" className="rounded-lg shrink-0" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">Admin Account</p>
              <p className="text-xs text-slate-400">v4.2.1 Stable</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
