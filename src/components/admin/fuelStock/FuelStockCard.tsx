import React from 'react'

type FuelStockCardProps = {
    title : string
    value : string | number
    unit? : string
    trend? : 'up' | 'down' | 'neutral'
    description? : string
}

export default function FuelStockCard({title, value, unit = '',trend = 'neutral', description } : FuelStockCardProps) {

    const trendColors = {
        up : 'text-green-500',
        down: 'text-green-500',
        neutral: 'text-gray-400'
    }
  
    return (
        <div className="bg-surface text-text-secondary p-6 rounded-lg shadow-xl">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="flex items-end gap-2">
            <p className="text-4xl font-bold mt-2">
              {value}
              {unit && <span className="text-xl ml-1">{unit}</span>}
            </p>
            {trend !== 'neutral' && (
              <span className={`${trendColors[trend]} mb-2`}>
                {trend === 'up' ? '↑' : '↓'}
              </span>
            )}
          </div>
          {description && (
            <p className="text-sm text-gray-400 mt-2">{description}</p>
          )}
        </div>
      );
  
}
