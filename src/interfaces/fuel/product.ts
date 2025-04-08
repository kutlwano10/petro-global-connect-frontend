export type FuelProduct = {
    id: string;
    name: string;
    pricePerLiter: number;
    colorCode: string;
    octaneRating?: number;  // For petrol
    sulfurContent?: number; // For diesel
    isPremium?: boolean;
  };
  
  export type Nozzle = {
    id: string;
    number: string;
    pumpId: string;
    fuelProductId: string;
    currentMeterReading: number;
    lastCalibrationDate: Date;
    status: 'ACTIVE' | 'MAINTENANCE' | 'OUT_OF_SERVICE';
  };
  
  export type FuelTransaction = {
    id: string;
    date: Date;
    nozzleId: string;
    openingReading: number;
    closingReading: number;
    pricePerLiter: number;
    paymentMethod: 'CASH' | 'CARD' | 'FLEET' | 'MOBILE' | 'VOUCHER';
    salespersonId: string;
    customerId?: string;
    vehicleReg?: string;
    discountApplied?: number;
    loyaltyPointsEarned?: number;
    shiftId: string; // Links to work shift
  };