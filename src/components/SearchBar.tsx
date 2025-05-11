import { useState } from 'react';
import { useSearchCrypto } from '../hooks/useCryptoPrices';

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults } = useSearchCrypto(searchQuery);

  return (
    <div className="relative mb-8">
      <input
        type="text"
        placeholder="Search cryptocurrencies..."
        className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && searchResults && (
        <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          {searchResults.map((crypto: any) => (
            <div
              key={crypto.id}
              className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};