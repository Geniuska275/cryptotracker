export interface Cryptocurrency {
    id: string;
    name: string;
    symbol: string;
  }
  
  export const SUPPORTED_CRYPTOS: Cryptocurrency[] = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'solana', name: 'Solana', symbol: 'SOL' },
    { id: 'matic-network', name: 'Polygon', symbol: 'MATIC' },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
  ];
  
  export interface CryptoPriceData {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
  }