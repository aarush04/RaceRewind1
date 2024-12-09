// server/src/utils/jwt.ts
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'default_dev_secret'; 

export interface JwtPayload {
  id: number;
  username: string;
}

export const generateToken = (payload: Record<string, unknown>): string => {
    return jwt.sign(payload, secret, { expiresIn: '1h' });
  };

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, secret) as JwtPayload;
}
