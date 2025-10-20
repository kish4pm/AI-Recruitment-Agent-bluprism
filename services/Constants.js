// Minimal Constants stub to satisfy imports.
// Replace values below with your real constants from upstream when ready.

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Jobifyr';
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';
export const DEFAULT_AVATAR = '/favicon.ico';
export const ROLES = {
  ADMIN: 'admin',
  RECRUITER: 'recruiter',
  CANDIDATE: 'candidate'
};
export const FLAGS = {
  ENABLE_VOICE: false,
  ENABLE_AI: false
};

export default {
  APP_NAME,
  API_BASE,
  DEFAULT_AVATAR,
  ROLES,
  FLAGS
};
