
import React, { useState } from 'react';
import { ISPUser, UserStatus, ConnectionType } from '../types';

interface UserManagementProps {
  users: ISPUser[];
  setUsers: React.Dispatch<React.SetStateAction<ISPUser[]>>;
}

export const UserManagement: React.FC<UserManagementProps> = ({ users, setUsers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<Partial<ISPUser>>({
    connectionType: ConnectionType.PPPOE,
    status: UserStatus.OFFLINE
  });

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.ipAddress.includes(searchTerm)
  );

  const handleAddUser = () => {
    const user: ISPUser = {
      id: Math.random().toString(36).substr(2, 9),
      username: newUser.username || 'unknown',
      connectionType: newUser.connectionType as ConnectionType,
      planId: 'plan-custom',
      status: UserStatus.OFFLINE,
      uptime: '-',
      downloaded: '0 B',
      uploaded: '0 B',
      expirationDate: newUser.expirationDate || new Date().toISOString().split('T')[0],
      ipAddress: 'Allocating...',
      macAddress: 'Pending...'
    };
    
    setUsers([...users, user]);
    setIsModalOpen(false);
    setNewUser({ connectionType: ConnectionType.PPPOE, status: UserStatus.OFFLINE });
  };

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case UserStatus.ONLINE: return 'bg-green-100 text-green-700';
      case UserStatus.OFFLINE: return 'bg-slate-100 text-slate-700';
      case UserStatus.EXPIRED: return 'bg-rose-100 text-rose-700';
      case UserStatus.DISABLED: return 'bg-amber-100 text-amber-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="Search username, IP..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm md:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 w-full md:w-auto text-sm md:text-base"
        >
          <i className="fa-solid fa-plus"></i>
          Register Customer
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Usage (DL/UL)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{user.username}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-medium">EXP: {user.expirationDate}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-600 font-bold px-2 py-1 bg-slate-100 rounded-lg">{user.connectionType}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${getStatusBadge(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-[11px] font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{user.ipAddress}</code>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[11px]">
                      <p className="text-slate-700 font-bold">DL: {user.downloaded}</p>
                      <p className="text-slate-500 font-medium">UL: {user.uploaded}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><i className="fa-solid fa-pen-to-square"></i></button>
                      <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"><i className="fa-solid fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">New Subscriber</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" 
                  placeholder="e.g., alex_wifi"
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Connection Type</label>
                <select 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  onChange={(e) => setNewUser({...newUser, connectionType: e.target.value as ConnectionType})}
                >
                  <option value={ConnectionType.PPPOE}>PPPoE (Wired)</option>
                  <option value={ConnectionType.HOTSPOT}>Hotspot (Voucher)</option>
                  <option value={ConnectionType.STATIC}>Static IP (Enterprise)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddUser}
                  className="w-full py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
