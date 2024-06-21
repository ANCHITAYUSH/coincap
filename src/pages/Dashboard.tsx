import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import CoinTable from '../components/CoinTable';
import Pagination from '../components/Pagination';
import { Coin } from '../interfaces/Coin';
import { API_URI } from '../constants';

const Dashboard = () => {

    const [data, setData] = useState<Coin[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<string>('symbol');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URI}`);
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
        };

        fetchData();
        const interval = setInterval(fetchData, 10000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleToggleFavorite = (id: string) => {
        setFavorites((prevFavorites) =>
        prevFavorites.includes(id)
            ? prevFavorites.filter((fav) => fav !== id)
            : [...prevFavorites, id]
        );
    };

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const sortedData = useCallback(() => {
        const sorted = [...data].sort((a, b) => {
            const fieldA = a[sortBy as keyof Coin].toString().toLowerCase();
            const fieldB = b[sortBy as keyof Coin].toString().toLowerCase();

            if(sortBy === 'priceUsd' || sortBy === 'marketCapUsd'){
                const fieldANum = parseFloat(fieldA);
                const fieldBNum = parseFloat(fieldB);
                if (fieldANum < fieldBNum) return sortOrder === 'asc' ? -1 : 1;
                if (fieldANum > fieldBNum) return sortOrder === 'asc' ? 1 : -1;
            }else{
                if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
                if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
            }

            return 0;
        });
        return sorted;
    }, [data, sortBy, sortOrder]);

    const paginatedData = sortedData().slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    if(!data || data.length === 0){
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p><span className='page-title'>CoinCap</span></p>
            <CoinTable
                data={paginatedData}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default Dashboard;
