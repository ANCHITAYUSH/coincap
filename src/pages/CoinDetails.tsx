import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CoinDetail from '../components/CoinDetail';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import HistoryTable from '../components/HistoryTable';
import { Coin } from '../interfaces/Coin';
import { CoinHistory } from '../interfaces/CoinHistory';

const CoinDetails: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const [coin, setCoin] = useState<Coin| null>(null);
  const [coinHistory, setCoinHistory] = useState<CoinHistory[]>([]);
  const MARKET_CAP_USD = 'Market Cap';
  const VOLUME_24_HR = 'Volume (24 hr)';
  const SUPPLY = 'Supply';
  const USD = 'USD';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coinData = await axios.get(`https://api.coincap.io/v2/assets/${id}`);
        setCoin(coinData.data.data);
        const coinHistoryData = await axios.get(`https://api.coincap.io/v2/assets/${id}/history?interval=m5`);
        setCoinHistory([...coinHistoryData.data.data].reverse());
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, [id]);

  if (!coin || coinHistory.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <p>
          <span className='page-title'>{coin.name}</span>
          <span className='coin-key'>({coin.symbol})</span>
        </p>
        <div  className='coin-card'>
          <p className='coin-price'>
            {parseFloat(coin.priceUsd).toFixed(2)}
            {parseFloat(coin.changePercent24Hr) < 0 ?
              <span className='loss'>
                <TrendingDownIcon/>
                {(0-parseFloat(coin.changePercent24Hr)).toFixed(2)}% (1d)
              </span> :
              <span className='profit'>
                <TrendingUpIcon/>
                {parseFloat(coin.changePercent24Hr).toFixed(2)}% (1d)
              </span>
            }
          </p>
          <p>
            <CoinDetail coinKey={MARKET_CAP_USD} coinValue={coin.marketCapUsd} coinSymbol={USD}/>
            <CoinDetail coinKey={VOLUME_24_HR} coinValue={coin.volumeUsd24Hr} coinSymbol={USD}/>
            <CoinDetail coinKey={SUPPLY} coinValue={coin.supply} coinSymbol={coin.symbol}/>
          </p>
        </div>
        <HistoryTable data={coinHistory}/>
      </div>
    </div>
  );
}

export default CoinDetails;
