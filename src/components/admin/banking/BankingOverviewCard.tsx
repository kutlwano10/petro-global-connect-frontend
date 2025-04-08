// components/OverviewSection.tsx
'use client'

interface Account {
  id: number
  name: string
  balance: number
  lastUpdated: string
}

interface OverviewSectionProps {
  accounts: Account[]
}

export default function BankingOverviewCard({ accounts }: OverviewSectionProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR'
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {accounts.map(account => (
        <div key={account.id} className="bg-surface p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-text-primary">{account.name}</h2>
          <p className="text-xl font-bold text-green-400">
            {formatCurrency(account.balance)}
          </p>
          <p className="text-text-secondary mt-1">
            Last updated: {account.lastUpdated}
          </p>
        </div>
      ))}
    </div>
  )
}