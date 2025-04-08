"use client"

import React , {useState} from 'react'
import { MeterReadingInsights } from './MeterReadingInsights'


export default function MeterReading() {
    const [date, setDate] = useState(new Date());

    // Mock data - replace with your actual data fetching
    const nozzleData = [
      {
        id: '1',
        nozzleNumber: '01',
        fuelType: 'Petrol 95',
        openingReading: 1250.50,
        closingReading: 1328.75,
        pricePerLiter: 22.45,
        transactions: 42
      },
      {
        id: '2',
        nozzleNumber: '02',
        fuelType: 'Diesel 50ppm',
        openingReading: 980.25,
        closingReading: 1045.60,
        pricePerLiter: 21.10,
        transactions: 35
      },
      // Add more nozzles as needed
    ];
  
    return (
      <div className="p-6">
        <div className='mb-6'>
            <h1 className='text-2xl'>Meter Readings</h1>
        </div>
        <MeterReadingInsights 
          data={nozzleData} 
          date={date} 
        />
      </div>
    );
}
