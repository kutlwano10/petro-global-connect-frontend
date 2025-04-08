// components/StatCard.tsx
'use client'

interface StatCardProps {
  title: string
  value: number
  trend: 'up' | 'down' | 'neutral'
  change?: number
  icon?: string
}

export default function StatCard({ 
  title, 
  value, 
  trend, 
  change = 0,
  icon = '📈'
}: StatCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-yellow-500'
  }

  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→'
  }

  return (
    <div className="bg-primary rounded-lg p-4 shadow-md hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold mt-1">
            {formatCurrency(value)}
          </p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
      
      <div className={`mt-2 flex items-center text-sm ${trendColors[trend]}`}>
        <span className="mr-1">{trendIcons[trend]}</span>
        <span>{change}% from last period</span>
      </div>
    </div>
  )
}