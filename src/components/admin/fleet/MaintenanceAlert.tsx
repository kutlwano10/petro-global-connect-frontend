import React from 'react';
import { MaintenanceAlert } from '@/interfaces/fleet/fleet';



export const MaintenanceAlerts = ({ alerts }: { alerts: MaintenanceAlert[] }) => (
  <div className="mt-6">
    <h3 className="text-xl font-semibold mb-3">Maintenance Alerts</h3>
    <div className="space-y-2">
      {alerts.map((alert) => (
        <div key={alert.vehicleId} className="p-3 bg-red-900/50 rounded-lg">
          <div className="flex justify-between">
            <span className="font-medium">{alert.vehicleId}</span>
            <span className={`text-${
              alert.severity === 'High' ? 'red' : 
              alert.severity === 'Medium' ? 'yellow' : 'gray'
            }-400`}>
              {alert.severity}
            </span>
          </div>
          <p className="text-sm">{alert.issue}</p>
          <p className="text-xs text-gray-400">
            Due: {alert.dueDate.toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  </div>
);