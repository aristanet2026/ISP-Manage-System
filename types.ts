
export enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  EXPIRED = 'expired',
  DISABLED = 'disabled'
}

export enum ConnectionType {
  PPPOE = 'PPPoE',
  HOTSPOT = 'Hotspot',
  STATIC = 'Static IP'
}

export interface NetworkPlan {
  id: string;
  name: string;
  speedLimit: string; // e.g., "10M/10M"
  price: number;
  validity: number; // in days
}

export interface ISPUser {
  id: string;
  username: string;
  connectionType: ConnectionType;
  planId: string;
  status: UserStatus;
  uptime: string;
  downloaded: string;
  uploaded: string;
  expirationDate: string;
  ipAddress: string;
  macAddress: string;
}

export interface TrafficData {
  time: string;
  download: number;
  upload: number;
}

export interface Invoice {
  id: string;
  userId: string;
  amount: number;
  date: string;
  status: 'paid' | 'unpaid' | 'overdue';
}
