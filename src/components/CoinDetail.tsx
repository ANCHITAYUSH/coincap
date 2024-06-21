import React from 'react';

interface KeyValue {
    coinKey: string;
    coinValue: string;
    coinSymbol: string;
}

const CoinDetail: React.FC<KeyValue> = ({coinKey, coinValue, coinSymbol}) => {
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
