// types/auth.ts - Complete untuk eBantuan JKM
import type { User as PrismaUser } from '@prisma/client'

// 1. Request Bodies
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  role: Role
}

export interface VerifyEmailPayload {
  token: string
}

// 2. API Responses
export interface LoginResponse {
  success: boolean
  token: string
  user: Pick<PrismaUser, 'id' | 'name' | 'email' | 'role'>
}

export interface RegisterResponse {
  success: boolean
  message: string
  user: Pick<PrismaUser, 'id' | 'name' | 'email' | 'role'>
}

export interface VerifyResponse {
  success: boolean
  message?: string
}

// 3. JWT Payload
export interface AuthPayload {
  userId: string
  email: string
  name: string
  role: Role
  iat: number
  exp: number
}

// 4. Error Responses
export interface ApiError {
  error: string
  status?: number
}

// 5. Roles (Literal Union - Type Safety!)
export type Role = 
  | 'PEMOHON'
  | 'PENTADBIR_SYSTEM'
  | 'PEMBANTU_TADBIR'
  | 'PEGAWAI_KEBAJIKAN_MASYARAKAT_DAERAH'
  | 'PEGAWAI_PENYIASAT'

// 6. Frontend Context (useAuth hook)
export interface AuthContextType {
  user: Pick<PrismaUser, 'id' | 'name' | 'email' | 'role'> | null
  token: string | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}
