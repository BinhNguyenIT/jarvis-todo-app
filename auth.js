const AUTH_STORAGE_KEY = 'jarvis-auth-session-v1';

function validateCredentials(username, password) {
  const normalizedUsername = String(username ?? '').trim();
  const normalizedPassword = String(password ?? '');

  if (!normalizedUsername && !normalizedPassword) {
    return { ok: false, message: 'Enter username and password.' };
  }
  if (!normalizedUsername) {
    return { ok: false, message: 'Username is required.' };
  }
  if (normalizedUsername.length < 3) {
    return { ok: false, message: 'Username must be at least 3 characters.' };
  }
  if (!normalizedPassword) {
    return { ok: false, message: 'Password is required.' };
  }
  if (normalizedPassword.length < 6) {
    return { ok: false, message: 'Password must be at least 6 characters.' };
  }

  return {
    ok: true,
    message: 'Login successful.',
    username: normalizedUsername,
  };
}

function saveSession(username, storage = globalThis.localStorage) {
  storage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ username }));
}

function loadSession(storage = globalThis.localStorage) {
  try {
    const raw = storage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.username !== 'string' || !parsed.username.trim()) return null;
    return { username: parsed.username.trim() };
  } catch {
    return null;
  }
}

function clearSession(storage = globalThis.localStorage) {
  storage.removeItem(AUTH_STORAGE_KEY);
}

// UMD-style export for browser and Node
const Auth = {
  AUTH_STORAGE_KEY,
  validateCredentials,
  saveSession,
  loadSession,
  clearSession,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Auth;
}
if (typeof window !== 'undefined') {
  window.Auth = Auth;
}
