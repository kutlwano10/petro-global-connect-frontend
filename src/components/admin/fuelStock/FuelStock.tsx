'use client'

import { useState, useEffect } from 'react';
import { FuelStockComp } from './FuelStockComp';
import { FuelStockSummary, FuelTransaction } from '@/interfaces/fuel/fuel';

export default function FuelStock() {
  const [summary, setSummary] = useState<FuelStockSummary>({
    totalStock: 0,
    dailyUsage: 0,
    lastRestockDate: null,
    daysRemaining: 0,
    criticalLevel: false,
  });

  const [transactions, setTransactions] = useState<FuelTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFuelData = async () => {
      try {
        // In a real app, you would fetch from your API
        const mockSummary: FuelStockSummary = {
          totalStock: 50000,
          dailyUsage: 2000,
          lastRestockDate: new Date('2024-07-15'),
          daysRemaining: Math.floor(50000 / 2000),
          criticalLevel: 50000 / 2000 < 3, // Critical if less than 3 days remaining
        };

        const mockTransactions: FuelTransaction[] = [
          {
            id: '1',
            date: new Date('2024-07-20'),
            type: 'RESTOCK',
            liters: 10000,
            stationId: '1',
            stationName: 'Main Station',
            supplier: 'PetroGlobal',
            notes: 'Regular monthly delivery',
          },
          {
            id: '2',
            date: new Date('2024-07-19'),
            type: 'SALE',
            liters: 3000,
            stationId: '2',
            stationName: 'Downtown Station',
            pricePerLiter: 1.75,
            notes: 'Fleet customer bulk purchase',
          },
          // Add more transactions as needed
        ];

        setSummary(mockSummary);
        setTransactions(mockTransactions);
      } catch (err) {
        setError('Failed to load fuel data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFuelData();
  }, []);

  if (isLoading) {
    return <div className="p-6 text-white">Loading fuel data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return <FuelStockComp summary={summary} transactions={transactions} />;
};
