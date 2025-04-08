
'use client'

import { useState, useEffect } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import StatCard from './StatsCard'

interface Creditor {
  date: string
  invoiceNumber: string
  name: string
  totalAmount: number
  vatAmount: number
  shop: number
  bakery: number
  consumables: number
  repairs: number
  other: number
  description?: string
}

export default function CreditorsTable() {
  const [creditors, setCreditors] = useState<Creditor[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    vat: 0,
    categories: {
      shop: 0,
      bakery: 0,
      consumables: 0,
      repairs: 0,
      other: 0
    }
  })

  const headers = [
    'Date', 'Invoice', 'Creditor', 'Total', 'VAT', 
    'Shop', 'Bakery', 'Consumables', 'Repairs', 'Other', 'Details'
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))
        
        const mockData: Creditor[] = [
          {
            date: '20/06/2024', 
            invoiceNumber: 'INVA MZ', 
            name: 'MUHAMMED',
            totalAmount: 5000, 
            vatAmount: 0, 
            shop: 5000, 
            bakery: 0, 
            consumables: 0, 
            repairs: 0, 
            other: 0, 
            description: 'Monthly supply'
          },
          {
            date: '20/06/2024', 
            invoiceNumber: 'LM20', 
            name: 'JAMES',
            totalAmount: 200, 
            vatAmount: 0, 
            shop: 200, 
            bakery: 0, 
            consumables: 0, 
            repairs: 0, 
            other: 0, 
            description: 'Cleaning supplies'
          },
        ]

        // Calculate stats
        const calculatedStats = {
          total: mockData.reduce((sum, c) => sum + c.totalAmount, 0),
          vat: mockData.reduce((sum, c) => sum + c.vatAmount, 0),
          categories: {
            shop: mockData.reduce((sum, c) => sum + c.shop, 0),
            bakery: mockData.reduce((sum, c) => sum + c.bakery, 0),
            consumables: mockData.reduce((sum, c) => sum + c.consumables, 0),
            repairs: mockData.reduce((sum, c) => sum + c.repairs, 0),
            other: mockData.reduce((sum, c) => sum + c.other, 0)
          }
        }

        setCreditors(mockData)
        setStats(calculatedStats)
      } catch (error) {
        console.error('Error fetching creditors:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-400">
        Loading creditors data...
      </div>
    )
  }

  return (
    <div className="p-6 m-4 rounded-xl bg-surface text-text-primary shadow-lg">
      <h1 className="text-2xl font-bold mb-2">Creditors Management</h1>
      <p className="text-text-secondary mb-6">
        Overview of all creditor transactions and financial obligations
      </p>

      {/* Card Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Outstanding" 
          value={stats.total} 
          trend="up" 
          change={12.5}
          icon="💰"
        />
        <StatCard 
          title="VAT Total" 
          value={stats.vat} 
          trend="down" 
          change={3.2}
          icon="🧾"
        />
        <StatCard 
          title="Shop Expenses" 
          value={stats.categories.shop} 
          trend="up" 
          change={8.7}
          icon="🛒"
        />
        <StatCard 
          title="Other Expenses" 
          value={stats.categories.other} 
          trend="neutral"
          icon="📊"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto  scroll-container border border-gray-700 rounded-lg">
        <table className="w-full text-left bg-primary border-collapse">
          <thead className="border-b sticky top-0">
            <tr>
              {headers.map((header) => (
                <th 
                  key={header} 
                  className="px-4 py-3 text-sm font-medium  border-r border-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {creditors.map((creditor, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm whitespace-nowrap">{creditor.date}</td>
                <td className="px-4 py-3 text-sm font-medium">{creditor.invoiceNumber}</td>
                <td className="px-4 py-3 text-sm">{creditor.name}</td>
                <td className="px-4 py-3 text-sm text-right font-medium">
                  {formatCurrency(creditor.totalAmount)}
                </td>
                <td className="px-4 py-3 text-sm text-right">
                  {formatCurrency(creditor.vatAmount)}
                </td>
                <td className="px-4 py-3 text-sm text-right">
                  {formatCurrency(creditor.shop)}
                </td>
                <td className="px-4 py-3 text-sm text-right">
                  {formatCurrency(creditor.bakery)}
                </td>
                <td className="px-4 py-3 text-sm text-right">
                  {formatCurrency(creditor.consumables)}
                </td>
                <td className="px-4 py-3 text-sm text-right">
                  {formatCurrency(creditor.repairs)}
                </td>
                <td className="px-4 py-3 text-sm text-right">
                  {formatCurrency(creditor.other)}
                </td>
                <td className="px-4 py-3 text-sm flex items-center">
                  <FaInfoCircle className="text-gray-400 mr-2" />
                  <span className="truncate max-w-[150px]">
                    {creditor.description || 'N/A'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
        <div>Showing {creditors.length} creditors</div>
        <div>Last updated: {new Date().toLocaleString()}</div>
      </div>
    </div>
  )
}