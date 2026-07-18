import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../src/pages/Login';
import { loginUser } from '../../src/services/authService';
import { useAuthStore } from '../../src/store/authStore';

vi.mock('../../src/services/authService', () => ({
    loginUser: vi.fn(),
}));

describe('Login page', () => {
    beforeEach(() => {
        useAuthStore.setState({ user: null, token: null, isAuthenticated: false });
        vi.clearAllMocks();
    });

    it('logs in successfully and updates the store', async () => {
        const mockResponse = {
            user: { id: '1', name: 'Krish', email: 'krish@example.com', role: 'user' as const },
            token: 'fake-token',
        };
        vi.mocked(loginUser).mockResolvedValueOnce(mockResponse);

        render(<MemoryRouter><Login /></MemoryRouter>);

        await userEvent.type(screen.getByLabelText(/email/i), 'krish@example.com');
        await userEvent.type(screen.getByLabelText(/password/i), 'password123');
        await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(useAuthStore.getState().isAuthenticated).toBe(true);
        });
    });

    it('shows an error message on failed login', async () => {
        vi.mocked(loginUser).mockRejectedValueOnce({
            response: { data: { message: 'Invalid credentials' } },
        });

        render(<MemoryRouter><Login /></MemoryRouter>);

        await userEvent.type(screen.getByLabelText(/email/i), 'wrong@example.com');
        await userEvent.type(screen.getByLabelText(/password/i), 'wrongpass');
        await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

        expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
    });
});