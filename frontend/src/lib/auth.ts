// Simple token storage abstraction. In production prefer secure cookies (httpOnly) for refresh tokens.

const ACCESS_TOKEN_KEY = 'leyde_access_token';
const REFRESH_TOKEN_KEY = 'leyde_refresh_token';

export function saveAccessToken(accessToken: string, refreshToken?: string) {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } catch (e) {
    // Storage failure - ignore (could log)
  }
}

export function getAccessToken(): string | null {
  try { return localStorage.getItem(ACCESS_TOKEN_KEY); } catch (e) { return null; }
}

export function getRefreshToken(): string | null {
  try { return localStorage.getItem(REFRESH_TOKEN_KEY); } catch (e) { return null; }
}

export function clearTokens() {
  try { localStorage.removeItem(ACCESS_TOKEN_KEY); localStorage.removeItem(REFRESH_TOKEN_KEY); } catch (e) {}
}
