export type FleetVehicle = {
    id: string;
    licensePlate: string;
    vehicleType: 'Tanker' | 'Truck' | 'Van';
    currentDriver: string;
    status: 'In Transit' | 'Idle' | 'Maintenance' | 'Refueling';
    lastKnownLocation: {
      lat: number;
      lng: number;
      timestamp: Date;
    };
    fuelEfficiency: number; // km/L
  };
  
  export type FleetMovement = {
    id: string;
    vehicleId: string;
    startLocation: string;
    destination: string;
    distance: number; // km
    status: 'In Transit' | 'Delayed' | 'Completed' ;
    fuelUsed: number; // liters
    startTime: Date;
    estimatedArrival: Date;
    actualArrival?: Date;
    cargo?: {
      type: 'Fuel' | 'Goods';
      amount: number;
    };
  };

 export type MaintenanceAlert = {
    vehicleId: string;
    issue: string;
    severity: 'High' | 'Medium' | 'Low';
    dueDate: Date;
  };