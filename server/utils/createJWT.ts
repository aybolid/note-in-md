import jwt from 'jsonwebtoken'

const createJWT = (id: string): string => {
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

export default createJWT
