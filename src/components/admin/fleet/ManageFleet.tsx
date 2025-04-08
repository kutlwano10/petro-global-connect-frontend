'use client'

import React from 'react';
import  {FleetOverviewCards} from './FleetOverviewCards'
import { MaintenanceAlerts } from './MaintenanceAlert';
import { FleetDataTable } from './FleetDataTable';
import { FleetMapView } from './FleetMapView';
import { FleetVehicle, FleetMovement, MaintenanceAlert} from '@/interfaces/fleet/fleet';

const FleetManagement = () => {
  // Sample data - in reality, fetch from API
  const fleetMetrics = {
    totalVehicles: 24,
    vehiclesInTransit: 8,
    totalDistance: 3256,
    avgFuelEfficiency: 4.2,
    maintenanceDue: 3
  };

  const vehicles: FleetVehicle[] = [
    {
      id: 'TR-045',
      licensePlate: 'ABC123',
      vehicleType: 'Tanker',
      currentDriver: 'John Doe',
      status: 'In Transit',
      lastKnownLocation: { lat: -26.2041, lng: 28.0473, timestamp: new Date() },
      fuelEfficiency: 3.8
    },
    // More vehicles...
  ];

  const movements: FleetMovement[] = [
    {
      id: '1',
      vehicleId: 'TR-045',
      startLocation: 'Depot A',
      destination: 'Station B',
      distance: 120,
      status: 'In Transit',
      fuelUsed: 32,
      startTime: new Date(),
      estimatedArrival: new Date(Date.now() + 3600000),
      cargo: { type: 'Fuel', amount: 5000 }
    },
    // More movements...
  ];

  const alerts: MaintenanceAlert[] = [
    {
      vehicleId: 'TR-078',
      issue: 'Engine oil change overdue',
      severity: 'High',
      dueDate: new Date('2024-08-01')
    },
    // More alerts...
  ];

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-2">Fleet Management</h1>
      <p className="text-gray-400 mb-6">Real-time tracking and analytics</p>

      <FleetOverviewCards metrics={fleetMetrics} />
      <FleetMapView vehicles={vehicles} />
      <FleetDataTable movements={movements} />
      <MaintenanceAlerts alerts={alerts} />
    </div>
  );
};

export default FleetManagement;