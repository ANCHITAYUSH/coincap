import { Coin } from "./Coin";

export interface CoinTableProps {
    data: Coin[];
    favorites: string[];
    onToggleFavorite: (id: string) => void;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    onSort: (sortBy: string) => void;
}
