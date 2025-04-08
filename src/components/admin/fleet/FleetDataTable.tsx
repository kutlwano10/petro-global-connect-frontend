import React from 'react';
import { FleetMovement } from '@/interfaces/fleet/fleet';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'In Transit': return 'text-green-400';
    case 'Delayed': return 'text-red-400';
    case 'Completed': return 'text-blue-400';
    default: return 'text-gray-400';
  }
};

export const FleetDataTable = ({ movements }: { movements: FleetMovement[] }) => (
  <div className="overflow-x-auto bg-gray-800 rounded-lg">
    <table className="w-full">
      <thead className="bg-gray-700">
        <tr>
          <th className="p-3">Vehicle</th>
          <th className="p-3">Route</th>
          <th className="p-3">Distance</th>
          <th className="p-3">Fuel Used</th>
          <th className="p-3">Status</th>
          <th className="p-3">ETA</th>
        </tr>
      </thead>
      <tbody>
        {movements.map((move) => (
          <tr key={move.id} className="border-t border-gray-700">
            <td className="p-3">{move.vehicleId}</td>
            <td className="p-3">
              {move.startLocation} → {move.destination}
            </td>
            <td className="p-3">{move.distance} km</td>
            <td className="p-3">{move.fuelUsed} L</td>
            <td className="p-3">
              <span className={getStatusColor(move.status)}>
                {move.status}
              </span>
            </td>
            <td className="p-3">
              {new Date(move.estimatedArrival).toLocaleTimeString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);