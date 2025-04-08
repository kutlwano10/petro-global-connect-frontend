'use client';

import Image from 'next/image';
import { Station } from '@/interfaces/station/station';

type StationCardProps = {
  station: Station;
  onClick: (station: Station) => void;
};

export default function StationCard({ station, onClick }: StationCardProps) {
  return (
    <div
      className="bg-surface text-text-primary shadow-lg rounded-xl p-5 hover:scale-105 transition-transform cursor-pointer"
      onClick={() => onClick(station)}
    >
      <div className="h-40 justify-center flex w-full">
        <Image 
          src={station.logo} 
          alt={station.name}
          width={200}
          height={160}
          className="w-full h-full object-contain"
        />
      </div>
      <h2 className="text-lg font-semibold ">{station.name}</h2>
      <p className="text-gray-400">{station.location}</p>
      <div className="mt-3 flex justify-between items-center">
        <div>
          <p className="text-gray-500">Fuel Stock</p>
          <p className="text-text-secondary font-semibold">{station.fuelStock}</p>
        </div>
        <div>
          <p className="text-gray-500">Today's Sales</p>
          <p className="text-green-400 font-semibold">{station.sales}</p>
        </div>
      </div>
      <div className="mt-3">
        <span
          className={`text-white py-1 px-3 rounded-full ${
            station.status === 'Active' ? 'bg-green-500' :
            station.status === 'Low Stock' ? 'bg-yellow-500' :
            'bg-red-500'
          }`}
        >
          {station.status}
        </span>
      </div>
    </div>
  );
}