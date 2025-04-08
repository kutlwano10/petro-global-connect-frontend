'use client';

import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface NozzleInsight {
  id: string;
  nozzleNumber: string;
  fuelType: string;
  openingReading: number;
  closingReading: number;
  pricePerLiter: number;
  transactions: number;
}

interface NozzleInsightsProps {
  data: NozzleInsight[];
  date: Date;
}

export function MeterReadingInsights({ data, date }: NozzleInsightsProps) {
  // Calculate totals
  const totalRevenue = data.reduce((sum, nozzle) => {
    return sum + (nozzle.closingReading - nozzle.openingReading) * nozzle.pricePerLiter;
  }, 0);

  const totalLiters = data.reduce((sum, nozzle) => {
    return sum + (nozzle.closingReading - nozzle.openingReading);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">R{totalRevenue.toFixed(2)}</p>
            </div>
            <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-surface p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Liters Sold</p>
              <p className="text-2xl font-bold">{totalLiters.toFixed(2)} L</p>
            </div>
            <ArrowTrendingUpIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-surface p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Price/Liter</p>
              <p className="text-2xl font-bold">
                R{(totalRevenue / totalLiters).toFixed(2)}
              </p>
            </div>
            <ArrowTrendingDownIcon className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Date Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Nozzle Performance</h2>
        <p className="text-gray-500">
          {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Nozzle Table */}
      <div className="overflow-x-auto bg-surface rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-surface">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nozzle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fuel Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opening
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Closing
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Liters Sold
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price/L
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transactions
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((nozzle) => {
              const litersSold = nozzle.closingReading - nozzle.openingReading;
              const revenue = litersSold * nozzle.pricePerLiter;

              return (
                <tr key={nozzle.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {nozzle.nozzleNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {nozzle.fuelType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {nozzle.openingReading.toFixed(2)} L
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {nozzle.closingReading.toFixed(2)} L
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium">{litersSold.toFixed(2)} L</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    R{nozzle.pricePerLiter.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-green-600 dark:text-green-400">
                    R{revenue.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {nozzle.transactions}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Fuel Type Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from(new Set(data.map(n => n.fuelType))).map((fuelType) => {
          const fuelData = data.filter(n => n.fuelType === fuelType);
          const fuelRevenue = fuelData.reduce((sum, nozzle) => {
            return sum + (nozzle.closingReading - nozzle.openingReading) * nozzle.pricePerLiter;
          }, 0);
          const fuelLiters = fuelData.reduce((sum, nozzle) => {
            return sum + (nozzle.closingReading - nozzle.openingReading);
          }, 0);

          return (
            <div key={fuelType} className="bg-surface p-4 rounded-lg shadow">
              <h3 className="font-medium mb-3">{fuelType} Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Sold:</span>
                  <span className="font-medium">{fuelLiters.toFixed(2)} L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Revenue:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    R{fuelRevenue.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Avg. Price/Liter:</span>
                  <span className="font-medium">
                    R{(fuelRevenue / fuelLiters).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}