import { FuelProduct, Nozzle, FuelTransaction } from "@/interfaces/fuel/product";
import { v4 as uuidv4 } from 'uuid';

export const mockFuelProducts: FuelProduct[] = [
  {
    id: 'petrol-95',
    name: 'Petrol 95',
    pricePerLiter: 22.45,
    colorCode: '#3B82F6',
    octaneRating: 95,
    isPremium: false
  },
  {
    id: 'diesel-50ppm',
    name: 'Diesel 50ppm',
    pricePerLiter: 21.10,
    colorCode: '#10B981',
    sulfurContent: 50
  },
  // Add more products as needed
];

export const mockNozzles: Nozzle[] = [
  {
    id: 'nozzle-1',
    number: '01',
    pumpId: 'pump-1',
    fuelProductId: 'petrol-95',
    currentMeterReading: 12543.21,
    lastCalibrationDate: new Date('2024-06-15'),
    status: 'ACTIVE'
  },
  // Add more nozzles
];

export const generateMockTransactions = (count: number): FuelTransaction[] => {
  const transactions: FuelTransaction[] = [];
  const paymentMethods: ('CASH' | 'CARD' | 'FLEET' | 'MOBILE')[] = ['CASH', 'CARD', 'FLEET', 'MOBILE'];
  
  for (let i = 0; i < count; i++) {
    const nozzle = mockNozzles[Math.floor(Math.random() * mockNozzles.length)];
    const litersSold = parseFloat((Math.random() * 50 + 5).toFixed(2)); // 5-55 liters
    const product = mockFuelProducts.find(p => p.id === nozzle.fuelProductId);
    
    transactions.push({
      id: uuidv4(),
      date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time in last 7 days
      nozzleId: nozzle.id,
      openingReading: nozzle.currentMeterReading,
      closingReading: nozzle.currentMeterReading + litersSold,
      pricePerLiter: product?.pricePerLiter || 0,
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      salespersonId: `emp-${Math.floor(Math.random() * 5) + 1}`,
      vehicleReg: Math.random() > 0.3 ? `GP ${Math.floor(Math.random() * 9000) + 1000}` : undefined,
      shiftId: `shift-${Math.floor(Math.random() * 3) + 1}`
    });
  }

  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime()); // Newest first
};