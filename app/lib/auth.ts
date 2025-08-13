import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { randomBytes } from 'crypto'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret'

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12)
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}

export const generateJWT = (payload: any): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export const verifyJWT = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export const generateAffiliateCode = (firstName: string, lastName: string): string => {
  const randomSuffix = randomBytes(3).toString('hex').toUpperCase()
  const namePrefix = (firstName.slice(0, 2) + lastName.slice(0, 2)).toUpperCase()
  return `${namePrefix}${randomSuffix}`
}

export const generateEmailVerificationToken = (): string => {
  return randomBytes(32).toString('hex')
}