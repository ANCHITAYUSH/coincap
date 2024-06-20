import React from 'react';

interface KeyValue {
    coinKey: string;
    coinValue: string;
}

const CoinDetail: React.FC<KeyValue> = ({coinKey, coinValue}) => {
  return (
    <div>
      <p>
        <span className="coin-key">{coinKey}: </span>
        <span className="coin-val">${parseFloat(coinValue).toFixed(2)}</span>
      </p>
    </div>
  );
}

export default CoinDetail;
