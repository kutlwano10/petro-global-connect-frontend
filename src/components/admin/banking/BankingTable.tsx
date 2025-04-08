// components/TransactionTable.tsx
'use client'

import { useState } from 'react'

interface Transaction {
  id: number
  date: string
  shop: string
  type: string
  amount: number
}

interface TransactionTableProps {
  transactions: Transaction[]
}

export default function BankingTable({ transactions }: TransactionTableProps) {
  const [search, setSearch] = useState('')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR'
    }).format(amount)
  }

  const getTransactionClass = (type: string) => {
    return type === "Deposit" ? "text-green-400" : "text-red-400"
  }

  const filteredTransactions = transactions.filter(transaction =>
    transaction.shop.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="bg-surface p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-text-primary">Recent Transactions</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search transactions..."
        className="w-full p-2 mb-4 bg-gray-800 rounded-lg text-text-primary focus:outline-none"
      />
      <div className="overflow-x-auto">
        <table className="w-full text-left text-text-secondary">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Shop</th>
              <th className="py-2 px-4">Type</th>
              <th className="py-2 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => (
              <tr key={transaction.id} className="border-b border-gray-800">
                <td className="py-2 px-4">{transaction.date}</td>
                <td className="py-2 px-4">{transaction.shop}</td>
                <td className="py-2 px-4">
                  <span className={getTransactionClass(transaction.type)}>
                    {transaction.type}
                  </span>
                </td>
                <td className="py-2 px-4 text-right">
                  {formatCurrency(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}