import React from 'react';
import { render, screen } from '@testing-library/react';
import CoinTable from './components/CoinTable';

const mockData = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    priceUsd: '45000.00',
    marketCapUsd: '850000000000',
  },
];

test('renders CoinTable', () => {
  render(
    <CoinTable
      data={mockData}
      favorites={[]}
      onToggleFavorite={() => {}}
      sortBy="symbol"
      sortOrder="asc"
      onSort={() => {}}
    />
  );
  expect(screen.getByText(/Bitcoin/)).toBeInTheDocument();
});