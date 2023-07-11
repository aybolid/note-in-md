import jwt from 'jsonwebtoken'

export const createToken = (id: string): string => {
  const payload = { id }
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

export const decodeToken = async (token: string): Promise<any> => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
  return decoded
}
