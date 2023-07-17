import jwt, { JwtPayload } from 'jsonwebtoken';

/** Creates a JWT token for the given user ID. */
export const createToken = (id: string): string => {
  const payload = { id };
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/** Decodes and verifies the given token. */
export const decodeToken = <T>(token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as T &
    jwt.JwtPayload;
  return decoded;
};
