export type FuelTransaction = {
    id: string;
    date: Date;
    type: 'RESTOCK' | 'SALE' | 'ADJUSTMENT' | 'LOSS';
    liters: number;
    stationId: string;
    stationName: string;
    pricePerLiter?: number;
    supplier?: string;
    notes?: string;
  };
  
  export type FuelStockSummary = {
    totalStock: number;
    dailyUsage: number;
    lastRestockDate: Date | null;
    daysRemaining: number;
    criticalLevel: boolean;
  };