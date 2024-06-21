import React from 'react';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { CoinTableProps } from '../interfaces/CoinTableProps';
import { MARKET_CAP, NAME, PRICE, SYMBOL, USD } from '../constants';

const CoinTable: React.FC<CoinTableProps> = ({
    data, favorites, onToggleFavorite, sortBy, sortOrder, onSort
  }) => {

    const handleSort = (column: string) => {
        onSort(column);
      };
    
    const isFavorite = (id: string) => favorites.includes(id);

    return (
        <div>
            <table className="table table-sm border table-hover">
                <thead>
                    <tr className=''  style={{height:"20px"}}>
                        <th style={{width: "5%"}}></th>
                        <th style={{width: "15%", whiteSpace: 'nowrap'}} onClick={() => handleSort('symbol')}>{SYMBOL} {sortBy === 'symbol' ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ''}</th>
                        <th style={{width: "25%", whiteSpace: 'nowrap'}} onClick={() => handleSort('name')}>{NAME} {sortBy === 'name' ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ''}</th>
                        <th style={{width: "25%", whiteSpace: 'nowrap'}} onClick={() => handleSort('priceUsd')}>{PRICE} ({USD}) {sortBy === 'priceUsd' ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ''}</th>
                        <th style={{width: "30%", whiteSpace: 'nowrap'}} onClick={() => handleSort('marketCapUsd')}>{MARKET_CAP} ({USD}) {sortBy === 'marketCapUsd' ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ''}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((coin) => (
                        <tr key={coin.id}>
                            <td style={{width: "5%"}}>
                                {isFavorite(coin.id) ? 
                                    <Checkbox 
                                        icon={<FavoriteBorder />} 
                                        checkedIcon={<Favorite />}
                                        onClick={() => onToggleFavorite(coin.id)}  
                                        checked
                                    /> :
                                    <Checkbox 
                                        icon={<FavoriteBorder />} 
                                        checkedIcon={<Favorite />}
                                        onClick={() => onToggleFavorite(coin.id)} 
                                    />
                                }
                            </td>
                            <td style={{width: "15%"}}>{coin.symbol}</td>
                            <td style={{width: "25%", whiteSpace: 'nowrap'}}>
                            <Link to={`/details/${coin.id}`}>{coin.name}</Link>
                            </td>
                            <td style={{width: "25%"}}>{parseFloat(coin.priceUsd).toFixed(2)}</td>
                            <td style={{width: "30%"}}>{parseFloat(coin.marketCapUsd).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CoinTable;
