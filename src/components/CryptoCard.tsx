import { CryptoPriceData } from '../constants';

interface CryptoCardProps {
  crypto: CryptoPriceData;
}

export const CryptoCard = ({ crypto }: CryptoCardProps) => {
  const isPositive = crypto.price_change_percentage_24h >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {crypto.name} ({crypto.symbol.toUpperCase()})
          </h3>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
            ${crypto.current_price.toLocaleString()}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            isPositive
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}
        >
          {isPositive ? '+' : ''}
          {crypto.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};