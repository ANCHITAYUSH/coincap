import React from 'react';

interface CoinHistory{
    priceUsd: string;
    time: string;
}

interface HistoryTableProps{
    data: CoinHistory[];
}

const HistoryTable: React.FC<HistoryTableProps> = ({data}) => {


    const convertTimestampToGMT = (timestamp: number): string => {
        const date = new Date(timestamp);
        return date.toUTCString();
    };

  return (
    <div className='history'>
        <table className="table table-sm border table-hover">
            <thead>
                <tr className=''  style={{height:"20px"}}>
                    <th style={{width: "10%", whiteSpace: 'nowrap'}} >Time (GMT)</th>
                    <th style={{width: "10%", whiteSpace: 'nowrap'}} >Price (USD)</th>
                </tr>
            </thead>
            <tbody>
                {data.map((coin) => (
                    <tr key={coin.time}>
                        <td style={{width: "10%"}}>{convertTimestampToGMT(parseInt(coin.time))}</td>
                        <td style={{width: "10%"}}>{parseFloat(coin.priceUsd).toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default HistoryTable;
