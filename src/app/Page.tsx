'use client';

import { useCryptoPrices } from '../hooks/useCryptoPrices';
import { CryptoCard } from '../components/CryptoCard';
import { SUPPORTED_CRYPTOS } from '../constants';
import { useState, useMemo } from 'react';
import { NavSelector } from '@/components/navigation';

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
          <h1 className="text-3xl font-[Poppins] font-bold text-gray-900 dark:text-white mb-8">
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
          <h1 className="text-3xl font-bold font-[Poppins] text-gray-900 dark:text-white mb-8">
            Error fetching cryptocurrency data
          </h1>
          <p className="text-red-500 dark:text-red-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-[ #141414] dark:bg-gray-900 p-8">
     
    <main
    //  className="max-w-7xl mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8 py-8"
     className=" max-w-7xl mx-auto min-h-screen bg-[ #141414] dark:bg-gray-900 p-8"
     
     >
<div className="flex flex-col md:justify-between  md:items-center sm:flex-row   sm:items-center gap-[40px] my-6">
        <h1 className=" ml-[65px] text-2xl md:mt-4  font-[Poppins] font-bold text-gray-900 dark:text-white mb-8">
          Cryptocurrency Prices
        </h1>
        <div>
         <NavSelector value={sortBy} onChange={setSortBy} />  
        </div>
      </div>
       {sortBy === 'name' && (
  <div className=" overflow-hidden mt-3">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-[#2C2F36]">
          <tr>
            <th className="px-4 py-2 text-gray-400">ID</th>
            <th className="px-4 py-2 text-gray-400">Name</th>
            <th className="px-4 py-2 text-gray-400">Symbol</th>
            <th className="px-4 py-2 text-gray-400">Current Price</th>
            <th className="px-4 py-2 text-gray-400">24h Change</th>
          
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 bg-[#212429]">
          {sortedData.map((crypto) => {
             const isPositive = crypto.price_change_percentage_24h >= 0;
   
            
           return (<tr key={crypto.id} className="hover:bg-[#2C2F36]">
              <td className="px-4 py-2 text-center text-gray-400">{crypto.id}</td>
              <td className="px-4 py-2 text-center text-gray-400">{crypto.name}</td>
              <td className="px-4 py-2  text-center text-gray-400">{crypto.symbol}</td>
              <td className="px-4 py-2 text-center text-gray-400">
                ${crypto.current_price.toLocaleString()}
              </td>
           
              <td 
              // className="px-4 py-2  text-center text-gray-400"
               className={`px-4 py-2 text-sm text-center font-medium ${
                isPositive
                  ? ' text-green-800  dark:text-green-200'
                  : ' text-red-800  dark:text-red-300'
              }`}
              >
              {isPositive ? '+' : ''}
                {crypto.price_change_percentage_24h_in_currency?.toFixed(2)}%
              </td>
            </tr>)
          })
        }
        </tbody>
      </table>
    </div>
  </div>
)}

{sortBy === 'price' && (
  <div className="bg-[#212429] rounded-lg overflow-hidden mt-3">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-800">
         <thead className="bg-[#2C2F36]">
          <tr>
            <th className="px-4 py-2 text-gray-400">ID</th>
            <th className="px-4 py-2 text-gray-400">Name</th>
            <th className="px-4 py-2 text-gray-400">Symbol</th>
            <th className="px-4 py-2 text-gray-400">Current Price</th>
            <th className="px-4 py-2 text-gray-400">24h Change</th>
          
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 bg-[#212429]">
          {sortedData.map((crypto) => {
             const isPositive = crypto.price_change_percentage_24h >= 0;
             
           return ( <tr key={crypto.id} className="hover:bg-[#2C2F36]">
              <td className="px-4 py-2 text-center text-gray-400">{crypto.id}</td>
              <td className="px-4 py-2 text-center text-gray-400">{crypto.name}</td>
              <td className="px-4 py-2  text-center text-gray-400">{crypto.symbol}</td>
              <td className="px-4 py-2 text-center text-gray-400">
                ${crypto.current_price.toLocaleString()}
              </td>
           
              <td 
              // className="px-4 py-2  text-center text-gray-400"
               className={`px-4 py-2 text-sm text-center font-medium ${
                isPositive
                  ? ' text-green-800  dark:text-green-200'
                  : ' text-red-800  dark:text-red-300'
              }`}
              >
              {isPositive ? '+' : ''}
                {crypto.price_change_percentage_24h_in_currency?.toFixed(2)}%
              </td>
            </tr>)
          })
        }
        </tbody>
      </table>
    </div>
  </div>
)}
{sortBy === '24hChange' && (
  <div className="bg-[#212429] rounded-lg overflow-hidden mt-3">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-800">
         <thead className="bg-[#2C2F36]">
          <tr>
            <th className="px-4 py-2 text-gray-400">ID</th>
            <th className="px-4 py-2 text-gray-400">Name</th>
            <th className="px-4 py-2 text-gray-400">Symbol</th>
            <th className="px-4 py-2 text-gray-400">Current Price</th>
            <th className="px-4 py-2 text-gray-400">24h Change</th>
          
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 bg-[#212429]">
          {sortedData.map((crypto) => {
              const isPositive = crypto.price_change_percentage_24h >= 0;

            return (<tr key={crypto.id} className="hover:bg-[#2C2F36]">
              <td className="px-4 py-2 text-center text-gray-400">{crypto.id}</td>
              <td className="px-4 py-2 text-center text-gray-400">{crypto.name}</td>
              <td className="px-4 py-2  text-center text-gray-400">{crypto.symbol}</td>
              <td className="px-4 py-2 text-center text-gray-400">
                ${crypto.current_price.toLocaleString()}
              </td>
           
              <td 
              // className="px-4 py-2  text-center text-gray-400"
               className={`px-4 py-2 text-sm text-center font-medium ${
                isPositive
                  ? ' text-green-800  dark:text-green-200'
                  : ' text-red-800  dark:text-red-300'
              }`}
              >
              {isPositive ? '+' : ''}
                {crypto.price_change_percentage_24h_in_currency?.toFixed(2)}%
              </td>
             
            </tr>)
        })}
        </tbody>
      </table>
    </div>
  </div>
)}
     </main>
</div>

          </>
    
  );
}