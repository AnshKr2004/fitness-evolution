export type UserStatus = "active" | "pending" | "inactive";
export type MembershipType = "basic" | "premium";

export interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  membership: MembershipType;
  lastActive: string;
  avatarUrl?: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  inactiveUsers: number;
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  clientsCount: number;
  trainerSchedules:[]
}

export interface TrainerStats {
  trainers: {
    rating: null;
    clientsCount: number;
    name: string;
    status: UserStatus;
    sessions: [];
  }[];
  totalTrainers: number;
  activeTrainers: number;
  avgRating: number;
  totalClients: number;
}

export interface SessionsStats {
  totalSessions: number;
  activeSessions: number;
  pendingSessions: number;
  completionRate: number;
}
