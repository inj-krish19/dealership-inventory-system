import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../../src/components/ProtectedRoute';
import { useAuthStore } from '../../src/store/authStore';

function Dashboard() {
    return <div>Dashboard Content</div>;
}
function LoginPage() {
    return <div>Login Page</div>;
}

function renderWithRoute() {
    return render(
        <MemoryRouter initialEntries={['/dashboard']}>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </MemoryRouter>
    );
}

describe('ProtectedRoute', () => {
    beforeEach(() => {
        useAuthStore.setState({ user: null, token: null, isAuthenticated: false });
    });

    it('redirects to /login when not authenticated', () => {
        renderWithRoute();
        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    it('renders protected content when authenticated', () => {
        useAuthStore.setState({ isAuthenticated: true, token: 'x', user: { id: '1', name: 'K', email: 'k@e.com', role: 'user' } });
        renderWithRoute();
        expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
    });
});