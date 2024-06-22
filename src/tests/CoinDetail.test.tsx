import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CoinDetailProps } from '../interfaces/CoinDetailProps';
import CoinDetail from '../components/CoinDetail';

describe('CoinDetail Component', () => {
  it('renders the coin key and value correctly', () => {
    const props: CoinDetailProps = {
      coinKey: 'Bitcoin',
      coinValue: '45000.789',
      coinSymbol: 'BTC'
    };

    const { getByText } = render(<CoinDetail {...props} />);

    // Check if the coin key is rendered correctly
    const coinKeyElement = getByText('Bitcoin:');
    expect(coinKeyElement).toBeInTheDocument();

    // Check if the coin value and symbol are rendered correctly
    const coinValueElement = getByText('45000.79 BTC');
    expect(coinValueElement).toBeInTheDocument();
  });

  it('formats the coin value to two decimal places', () => {
    const props: CoinDetailProps = {
      coinKey: 'Ethereum',
      coinValue: '1234.56789',
      coinSymbol: 'ETH'
    };

    const { getByText } = render(<CoinDetail {...props} />);

    // Check if the coin value is formatted to two decimal places
    const coinValueElement = getByText('1234.57 ETH');
    expect(coinValueElement).toBeInTheDocument();
  });

  it('handles different coin symbols', () => {
    const props: CoinDetailProps = {
      coinKey: 'Litecoin',
      coinValue: '200.1234',
      coinSymbol: 'LTC'
    };

    const { getByText } = render(<CoinDetail {...props} />);

    // Check if the coin symbol is rendered correctly
    const coinValueElement = getByText('200.12 LTC');
    expect(coinValueElement).toBeInTheDocument();
  });
});
