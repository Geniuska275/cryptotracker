'use client';

import { useCryptoPrices } from '../hooks/useCryptoPrices';
import { CryptoCard } from '../components/CryptoCard';
import { SUPPORTED_CRYPTOS } from '../constants';
import { useState, useMemo } from 'react';

export default function CryptoPriceTracker() {
  const { data, isLoading, error } = useCryptoPrices();
  const [sortBy, setSortBy] = useState<'name' | 'price' | '24hChange'>('name');

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!data) return [];
    
    return [...data].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return b.current_price - a.current_price; // Descending by price
      return b.price_change_percentage_24h - a.price_change_percentage_24h; // Descending by 24h change
    });
  }, [data, sortBy]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Loading cryptocurrency data...
          </h1>
          <div className="space-y-4">
            {SUPPORTED_CRYPTOS.map((crypto) => (
              <div
                key={crypto.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-24 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Error fetching cryptocurrency data
          </h1>
          <p className="text-red-500 dark:text-red-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Cryptocurrency Price Tracker
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setSortBy('name')}
              className={`px-4 py-2 rounded-lg ${
                sortBy === 'name' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              Name
            </button>
            <button
              onClick={() => setSortBy('price')}
              className={`px-4 py-2 rounded-lg ${
                sortBy === 'price' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              Price
            </button>
            <button
              onClick={() => setSortBy('24hChange')}
              className={`px-4 py-2 rounded-lg ${
                sortBy === '24hChange' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              24h Change
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {sortedData?.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      </div>
    </div>
  );
}