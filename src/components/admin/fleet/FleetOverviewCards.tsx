import React from 'react';

type FleetMetrics = {
  totalVehicles: number;
  vehiclesInTransit: number;
  totalDistance: number;
  avgFuelEfficiency: number;
  maintenanceDue: number;
};

export const FleetOverviewCards = ({ metrics }: { metrics: FleetMetrics }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <div className="bg-surface p-4 rounded-lg">
      <h3 className="text-gray-400">Total Fleet</h3>
      <p className="text-2xl font-bold">{metrics.totalVehicles}</p>
    </div>
    <div className="bg-surface p-4 rounded-lg">
      <h3 className="text-gray-400">Active Now</h3>
      <p className="text-2xl font-bold text-green-400">{metrics.vehiclesInTransit}</p>
    </div>
    <div className="bg-surface p-4 rounded-lg">
      <h3 className="text-gray-400">Avg Efficiency</h3>
      <p className="text-2xl font-bold">{metrics.avgFuelEfficiency} km/L</p>
    </div>
    <div className="bg-surface p-4 rounded-lg">
      <h3 className="text-gray-400">Maintenance Due</h3>
      <p className="text-2xl font-bold text-yellow-400">{metrics.maintenanceDue}</p>
    </div>
  </div>
);