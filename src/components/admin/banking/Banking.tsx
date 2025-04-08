'use client'

import BankingOverviewCard from './BankingOverviewCard'
import BankingTable from './BankingTable'

export default function Banking() {
  const accounts = [
    { id: 1, name: "Main Account", balance: 500000, lastUpdated: "Today" },
    { id: 2, name: "Fuel Station 1", balance: 120000, lastUpdated: "Today" },
    { id: 3, name: "Convenience Store", balance: 80000, lastUpdated: "Yesterday" }
  ]

  const transactions = [
    { id: 1, date: "2024-08-06", shop: "Fuel Station 1", type: "Deposit", amount: 15000 },
    { id: 2, date: "2024-08-05", shop: "Convenience Store", type: "Withdrawal", amount: -5000 },
    { id: 3, date: "2024-08-05", shop: "Main Account", type: "Payment", amount: -10000 }
  ]

  return (
    <div className="p-6 text-text-primary min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Banking Overview</h1>
      
      <BankingOverviewCard accounts={accounts} />
      <BankingTable transactions={transactions} />
    </div>
  )
}