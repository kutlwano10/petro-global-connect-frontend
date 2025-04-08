// components/StationsGrid.tsx
'use client';

import { useState } from 'react';
import StationCard from './StationCard';
import { Station } from '@/interfaces/station/station';

export default function StationsGrid() {
  const [stations, setStations] = useState<Station[]>([
    {
      id: 1,
      name: "Engen Midrand",
      logo: "/engen-logo.png",
      location: "Midrand, GP",
      fuelStock: "12,500L",
      sales: "R 45,000",
      status: "Active",
    },
    {
      id: 2,
      name: "Sasol Germiston",
      logo: "/sasol-logo.png",
      location: "Germiston, GP",
      fuelStock: "8,200L",
      sales: "R 30,200",
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Total Bedfordview",
      logo: "/total-logo.png",
      location: "Johannesburg, GP",
      fuelStock: "15,300L",
      sales: "R 52,700",
      status: "Active",
    },
    {
      id: 4,
      name: "BP Hatfield",
      logo: "/bp.png",
      location: "Pretoria, GP",
      fuelStock: "6,400L",
      sales: "R 21,500",
      status: "Closed",
    },
  ]);

  const selectStation = (station: Station) => {
    console.log("Selected Station:", station.name);
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stations.map((station) => (
        <StationCard
          key={station.id}
          station={station}
          onClick={selectStation}
        />
      ))}
    </div>
  );
}

