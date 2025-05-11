import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface CryptoPriceData {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
  }
  

const DEFAULT_COINS = ["bitcoin", "ethereum", "solana", "polygon", "dogecoin"]

export const useCryptoPrices = () => {
  const ids = DEFAULT_COINS.join(',')
  const fetchCryptoPrices = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&price_change_percentage=24h`
    )
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  }

  return useQuery({
    queryKey: ['cryptoPrices'],
    queryFn: fetchCryptoPrices,
    refetchInterval: 30000,
    staleTime: 10000
  })
}

export const useSearchCrypto = (query: any) => {
  return useQuery({
    queryKey: ['searchCrypto', query],
    queryFn: async () => {
      if (!query) return []
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${query}&price_change_percentage=24h`
      )
      if (!response.ok) throw new Error('Network response was not ok')
      return response.json()
    },
    enabled: !!query
  })
}

export default function CryptoTracker() {
  const [search, setSearch] = useState("")
  const [coins, setCoins] = useState(DEFAULT_COINS)
  const [sortAsc, setSortAsc] = useState(true)

  const { data, error, isLoading } = useCryptoPrices()
  const searchQuery = useSearchCrypto(search.toLowerCase())

  const handleSearch = async (e: any) => {
    e.preventDefault()
    if (!search.trim()) return

    const found = searchQuery.data?.[0]?.id
    if (found && !coins.includes(found)) {
      setCoins([...coins, found])
      setSearch("")
    }
  }

const filteredData = (data?.filter((crypto: CryptoPriceData) =>
    coins.includes(crypto.id)
  ) || []) as CryptoPriceData[];
  
  const sortedCoins = [...filteredData].sort((a, b) => {
    const aChange = a.price_change_percentage_24h || 0;
    const bChange = b.price_change_percentage_24h || 0;
    return sortAsc ? aChange - bChange : bChange - aChange;
  });
  

  if (isLoading) return <div className="p-4 text-center">Loading...</div>
  if (error) return <div className="p-4 text-red-500 text-center">Error fetching data</div>

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Crypto Price Tracker</h1>

      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search coin by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      <button
        onClick={() => setSortAsc(!sortAsc)}
        className="mb-2 text-sm text-blue-500 hover:underline"
      >
        Sort by 24h Change ({sortAsc ? "Asc" : "Desc"})
      </button>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-2">Name</th>
            <th className="pb-2">Symbol</th>
            <th className="pb-2">Price (USD)</th>
            <th className="pb-2">24h Change</th>
          </tr>
        </thead>
        <tbody>
        {sortedCoins.map((crypto) => (
            <tr key={crypto.id} className="border-b hover:bg-gray-50">
              <td className="py-2 capitalize">{crypto.name}</td>
              <td className="py-2 uppercase">{crypto.symbol}</td>
              <td className="py-2">${crypto.current_price.toLocaleString()}</td>
              <td
                className={`py-2 font-medium ${
                  crypto.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  )
}
