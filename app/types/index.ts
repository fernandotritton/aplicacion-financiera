export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  isEmailVerified: boolean
  affiliateCode?: string
  referredBy?: string
  hasAffiliatePlan: boolean
  affiliatePlanDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl?: string
  isActive: boolean
}

export interface Order {
  id: string
  userId: string
  total: number
  discount: number
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  items: OrderItem[]
  createdAt: Date
}

export interface OrderItem {
  id: string
  productId: string
  product: Product
  quantity: number
  price: number
}

export interface AffiliateEarning {
  id: string
  affiliateId: string
  orderId: string
  commissionRate: number
  commissionAmount: number
  status: 'PENDING' | 'APPROVED' | 'PAID'
  createdAt: Date
}

export interface AccountStatement {
  id: string
  userId: string
  month: number
  year: number
  totalEarnings: number
  totalReferrals: number
  commissionRate: number
  createdAt: Date
}

export interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
  referralCode?: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface PaymentData {
  amount: number
  type: 'AFFILIATE_PLAN' | 'PRODUCT_PURCHASE'
  productIds?: string[]
}