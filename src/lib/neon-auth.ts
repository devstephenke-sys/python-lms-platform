/**
 * Neon Auth Integration
 * Handles authentication using Neon's built-in auth service
 */

const NEON_AUTH_URL = process.env.NEON_AUTH_URL || 'https://ep-rapid-salad-b57btndg.neonauth.c-7.us-east-2.aws.neon.tech/neondb/auth';
const NEON_JWKS_URL = process.env.NEON_JWKS_URL || 'https://ep-rapid-salad-b57btndg.neonauth.c-7.us-east-2.aws.neon.tech/neondb/auth/.well-known/jwks.json';

export interface NeonAuthConfig {
  authUrl: string;
  jwksUrl: string;
}

export const neonAuthConfig: NeonAuthConfig = {
  authUrl: NEON_AUTH_URL,
  jwksUrl: NEON_JWKS_URL,
};

/**
 * Get Neon Auth configuration
 */
export function getNeonAuthConfig(): NeonAuthConfig {
  return neonAuthConfig;
}

/**
 * Validate that Neon Auth is configured
 */
export function isNeonAuthConfigured(): boolean {
  return !!(process.env.NEON_AUTH_URL && process.env.NEON_JWKS_URL);
}
