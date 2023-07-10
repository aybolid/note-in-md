import jwt from 'jsonwebtoken'

export const createToken = (id: string): string => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  )
}

export const decodeToken = async (token: string): Promise<any> => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
  return decoded
}