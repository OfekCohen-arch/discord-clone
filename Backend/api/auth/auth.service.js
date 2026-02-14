import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { loggerService } from '../../services/logger.service.js'
import { userService } from '../user/user.service.js'

export const authService = {
  login,
  signup,
  getLoginToken,
  validateToken,
}

async function login(email, password) {
  loggerService.debug(`auth.service - login with email: ${email}`)

  const user = await userService.getByEmail(email)
  if (!user) throw new Error('Invalid email or password')

  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new Error('Invalid email or password')

  const { password: _, ...safeUser } = user
  const token = getLoginToken(safeUser)

  return { user: safeUser, token }
}

async function signup(username, password, email,date_of_birth) {
  loggerService.debug(
    `auth.service - signup with username: ${username}, email: ${email}`
  )

  if (!username || !password || !email ||!date_of_birth)
    throw new Error('Missing details')

  const existingUser = await userService.getByEmail(email)
  if (existingUser) throw new Error('Email already exists')

  const hash = await bcrypt.hash(password, 10)

  const newUser = await userService.add({
    username,
    password: hash,
    email,
    date_of_birth
  })

  const { password: _, ...safeUser } = newUser
  const token = getLoginToken(safeUser)

  return { user: safeUser, token }
}

function getLoginToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin || false,
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

function validateToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    loggerService.warn('Invalid token')
    return null
  }
}
/*
{
  "email": "user@example.com",
  "username": "cool_user_123",
  "password": "your_secure_password",
  "date_of_birth": "2000-01-01",
  "gift_code_sku_id": null,
  "captcha_key": "P1_eyJ0eXAiOiJKV...", 
  "consent": true,
  "promotional_emails_opt_in": false
}
*/