import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CoinDetail from '../components/CoinDetail';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  priceUsd: string;
  marketCapUsd: string;
  changePercent24Hr: string;
  volumeUsd24Hr: string;
  explorer: string;
}

const CoinDetails: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [coin, setCoin] = useState<Coin | null>(null);
  const PRICE_USD = 'Price'
  const MARKET_CAP_USD = 'Market Cap'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.coincap.io/v2/assets/${id}`);
        setCoin(response.data.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [id]);

  if (!coin) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>
        <span className='page-title'>{coin.name}</span>
        <span className='coin-key'>({coin.symbol})</span>
      </p>
      <CoinDetail coinKey={PRICE_USD} coinValue={coin.priceUsd}/>
      <CoinDetail coinKey={MARKET_CAP_USD} coinValue={coin.marketCapUsd}/>
    </div>
  );
}

export default CoinDetails;
