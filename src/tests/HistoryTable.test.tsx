import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HistoryTable from '../components/HistoryTable';
import { CoinHistory } from '../interfaces/CoinHistory';
import { GMT, PRICE, TIME, USD } from '../constants';

const mockData: CoinHistory[] = [
  { priceUsd: '31000.00', time: 1620000000000 },
  { priceUsd: '32000.00', time: 1620005000000 },
  { priceUsd: '33000.00', time: 1620010000000 },
];

describe('HistoryTable Component', () => {
  it('renders the table headers correctly', () => {
    render(<HistoryTable data={mockData} />);

    expect(screen.getByText(`${TIME} (${GMT})`)).toBeInTheDocument();
    expect(screen.getByText(`${PRICE} (${USD})`)).toBeInTheDocument();
  });

  it('renders the correct number of rows', () => {
    render(<HistoryTable data={mockData} />);

    const rows = screen.getAllByRole('row');
    // 1 header row + number of data rows
    expect(rows).toHaveLength(mockData.length + 1);
  });

  it('renders the correct data in the table', () => {
    render(<HistoryTable data={mockData} />);

    mockData.forEach((coin) => {
      const date = new Date(parseInt(coin.time)).toUTCString();
      expect(screen.getByText(date)).toBeInTheDocument();
      expect(screen.getByText(parseFloat(coin.priceUsd).toFixed(2))).toBeInTheDocument();
    });
  });

  it('converts timestamp to GMT correctly', () => {
    render(<HistoryTable data={mockData} />);

    mockData.forEach((coin) => {
      const date = new Date(parseInt(coin.time)).toUTCString();
      expect(screen.getByText(date)).toBeInTheDocument();
    });
  });
});
