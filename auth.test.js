const test = require('node:test');
const assert = require('node:assert/strict');
const {
  validateCredentials,
  saveSession,
  loadSession,
  clearSession,
} = require('./auth');

function createStorage() {
  const data = new Map();
  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, String(value));
    },
    removeItem(key) {
      data.delete(key);
    },
  };
}

test('rejects empty username and password', () => {
  assert.deepEqual(validateCredentials('', ''), {
    ok: false,
    message: 'Enter username and password.',
  });
});

test('rejects short username', () => {
  assert.deepEqual(validateCredentials('ab', '123456'), {
    ok: false,
    message: 'Username must be at least 3 characters.',
  });
});

test('rejects short password', () => {
  assert.deepEqual(validateCredentials('jarvis', '12345'), {
    ok: false,
    message: 'Password must be at least 6 characters.',
  });
});

test('accepts valid credentials', () => {
  assert.deepEqual(validateCredentials(' jarvis ', '123456'), {
    ok: true,
    message: 'Login successful.',
    username: 'jarvis',
  });
});

test('session helpers persist and clear username', () => {
  const storage = createStorage();
  saveSession('jarvis', storage);
  assert.deepEqual(loadSession(storage), { username: 'jarvis' });
  clearSession(storage);
  assert.equal(loadSession(storage), null);
});
