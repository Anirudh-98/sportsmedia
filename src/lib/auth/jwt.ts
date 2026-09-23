import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'sportsmedia-super-secret-jwt-key-change-in-production-2026';
const key = new TextEncoder().encode(JWT_SECRET);

export interface TokenPayload {
  sub: string; // User ID
  email: string;
  role: string;
  name: string;
  [key: string]: any;
}

/**
 * Generates a short-lived access JWT (default: 15 minutes).
 */
export async function signAccessToken(payload: TokenPayload, expiresIn: string = '15m'): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(key);
}

/**
 * Generates a long-lived refresh JWT (default: 30 days).
 */
export async function signRefreshToken(userId: string, expiresIn: string = '30d'): Promise<string> {
  return new SignJWT({ sub: userId, type: 'refresh' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(key);
}

/**
 * Verifies an access JWT and returns its payload if valid.
 */
export async function verifyAccessToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

/**
 * Verifies a refresh JWT and returns its payload if valid.
 */
export async function verifyRefreshToken(token: string): Promise<{ sub: string; type: string } | null> {
  try {
    const { payload } = await jwtVerify(token, key);
    if (payload.type !== 'refresh' || !payload.sub) {
      return null;
    }
    return payload as { sub: string; type: string };
  } catch {
    return null;
  }
}
