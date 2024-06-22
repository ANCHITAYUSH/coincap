import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import CoinTable from '../components/CoinTable';
import { CoinTableProps } from '../interfaces/CoinTableProps';
import { Coin } from '../interfaces/Coin';

// Mock data for testing
const mockData: Coin[] = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', priceUsd: '45000.789', marketCapUsd: '850000000.00',changePercent24Hr: '',volumeUsd24Hr: '',supply: '',explorer: '' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', priceUsd: '3000.123', marketCapUsd: '350000000.00',changePercent24Hr: '',volumeUsd24Hr: '',supply: '',explorer: '' },
];

const mockFavorites = ['bitcoin'];

const mockOnToggleFavorite = jest.fn();
const mockOnSort = jest.fn();

const defaultProps: CoinTableProps = {
  data: mockData,
  favorites: mockFavorites,
  onToggleFavorite: mockOnToggleFavorite,
  sortBy: 'name',
  sortOrder: 'asc',
  onSort: mockOnSort,
};

const renderComponent = (props = defaultProps) => {
  return render(
    <Router>
      <CoinTable {...props} />
    </Router>
  );
};

describe('CoinTable Component', () => {
  it('renders the table headers correctly', () => {
    renderComponent();

    expect(screen.getByText(/Symbol/i)).toBeInTheDocument();
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Market Cap/i)).toBeInTheDocument();
  });

  it('renders the coin data correctly', () => {
    renderComponent();

    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('45000.79')).toBeInTheDocument();
    expect(screen.getByText('850000000.00')).toBeInTheDocument();

    expect(screen.getByText('ETH')).toBeInTheDocument();
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    expect(screen.getByText('3000.12')).toBeInTheDocument();
    expect(screen.getByText('350000000.00')).toBeInTheDocument();
  });

  it('renders the favorite icon correctly', () => {
    renderComponent();

    const favoriteIcon = screen.getAllByRole('checkbox')[0];
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toBeChecked();
  });

  it('toggles favorite when the favorite icon is clicked', () => {
    renderComponent();

    const favoriteIcon = screen.getAllByRole('checkbox')[1];
    fireEvent.click(favoriteIcon);

    expect(mockOnToggleFavorite).toHaveBeenCalledWith('ethereum');
  });

  it('calls onSort when table headers are clicked', () => {
    renderComponent();

    const nameHeader = screen.getByText(/Name/i);
    fireEvent.click(nameHeader);

    expect(mockOnSort).toHaveBeenCalledWith('name');

    const priceHeader = screen.getByText(/Price/i);
    fireEvent.click(priceHeader);

    expect(mockOnSort).toHaveBeenCalledWith('priceUsd');
  });
});
