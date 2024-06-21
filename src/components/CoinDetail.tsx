import React from 'react';
import { CoinDetailProps } from '../interfaces/CoinDetailProps';

const CoinDetail: React.FC<CoinDetailProps> = ({coinKey, coinValue, coinSymbol}) => {
  return (
    <div>
      <p>
        <span className="coin-key">{coinKey}: </span>
        <span className="coin-value">{parseFloat(coinValue).toFixed(2)} {coinSymbol}</span>
      </p>
    </div>
  );
}

export default CoinDetail;
