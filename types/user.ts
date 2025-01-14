export type UserStatus = 'active' | 'pending' | 'inactive'
export type MembershipType = 'basic' | 'premium'

export interface User {
  id: string
  name: string
  email: string
  status: UserStatus
  membership: MembershipType
  lastActive: string
  avatarUrl?: string
}

export interface UserStats {
  totalUsers: number
  activeUsers: number
  newUsers: number
  inactiveUsers: number
}