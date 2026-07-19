import { beforeEach, describe, expect, it } from 'vitest';
import { useAuthStore } from '../../src/store/authStore';

const mockUser = { id: '1', name: 'Krish', email: 'krish@example.com', role: 'user' as const };

describe('authStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ user: null, token: null, isAuthenticated: false });
  });

  it('login sets user, token, and isAuthenticated', () => {
    useAuthStore.getState().login(mockUser, 'fake-token');
    const state = useAuthStore.getState();

    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe('fake-token');
    expect(state.isAuthenticated).toBe(true);
    expect(localStorage.getItem('token')).toBe('fake-token');
  });

  it('logout clears user, token, and localStorage', () => {
    useAuthStore.getState().login(mockUser, 'fake-token');
    useAuthStore.getState().logout();
    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(localStorage.getItem('token')).toBeNull();
  });
});