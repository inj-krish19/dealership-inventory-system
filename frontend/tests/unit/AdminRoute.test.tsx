import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AdminRoute } from '../../src/components/AdminRoute';
import { useAuthStore } from '../../src/store/authStore';

function AdminPanel() {
    return <div>Admin Panel</div>;
}
function DashboardPage() {
    return <div>Dashboard Page</div>;
}

function renderWithRoute() {
    return render(
        <MemoryRouter initialEntries={['/admin']}>
            <Routes>
                <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<AdminPanel />} />
                </Route>
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
        </MemoryRouter>
    );
}

describe('AdminRoute', () => {
    beforeEach(() => {
        useAuthStore.setState({ user: null, token: null, isAuthenticated: false });
    });

    it('redirects non-admin users to /dashboard', () => {
        useAuthStore.setState({ user: { id: '1', name: 'K', email: 'k@e.com', role: 'user' }, token: 'x', isAuthenticated: true });
        renderWithRoute();
        expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
    });

    it('renders admin content for admin users', () => {
        useAuthStore.setState({ user: { id: '1', name: 'K', email: 'k@e.com', role: 'admin' }, token: 'x', isAuthenticated: true });
        renderWithRoute();
        expect(screen.getByText('Admin Panel')).toBeInTheDocument();
    });
});