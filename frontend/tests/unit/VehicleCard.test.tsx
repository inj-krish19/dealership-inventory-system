import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VehicleCard from '../../src/components/VehicleCard';
import type { Vehicle } from '../../src/types';

const inStock: Vehicle = { id: '1', make: 'Toyota', model: 'Corolla', category: 'Sedan', price: 22000, quantity: 5 };
const outOfStock: Vehicle = { id: '2', make: 'Honda', model: 'Civic', category: 'Sedan', price: 24500, quantity: 0 };

describe('VehicleCard', () => {
  it('renders vehicle details', () => {
    render(<VehicleCard vehicle={inStock} onPurchase={vi.fn()} purchasing={false} />);
    expect(screen.getByText('Toyota Corolla')).toBeInTheDocument();
    expect(screen.getByText('$22,000')).toBeInTheDocument();
    expect(screen.getByText('5 in stock')).toBeInTheDocument();
  });

  it('disables the purchase button when out of stock', () => {
    render(<VehicleCard vehicle={outOfStock} onPurchase={vi.fn()} purchasing={false} />);
    expect(screen.getByRole('button', { name: /unavailable/i })).toBeDisabled();
    expect(screen.getByText('Out of stock')).toBeInTheDocument();
  });

  it('calls onPurchase with the vehicle id when clicked', async () => {
    const onPurchase = vi.fn();
    render(<VehicleCard vehicle={inStock} onPurchase={onPurchase} purchasing={false} />);
    await userEvent.click(screen.getByRole('button', { name: /purchase/i }));
    expect(onPurchase).toHaveBeenCalledWith('1');
  });

  it('shows a purchasing state and disables the button', () => {
    render(<VehicleCard vehicle={inStock} onPurchase={vi.fn()} purchasing={true} />);
    expect(screen.getByRole('button', { name: /purchasing/i })).toBeDisabled();
  });
});