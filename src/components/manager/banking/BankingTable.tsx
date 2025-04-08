'use client';

import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { DailyBanking } from '@/interfaces/banking/banking';

interface BankingTableProps {
  bankings: DailyBanking[];
  onVerify: (id: string) => void;
  onUnverify: (id: string) => void;
}

export function BankingTable({ bankings, onVerify, onUnverify }: BankingTableProps) {
  return (
    <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Daily Banking Records</h3>
        <p className="text-sm text-gray-500">
          {bankings.length} records for selected date
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cash (R)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Card (R)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total (R)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bankings.map((banking) => (
              <tr key={banking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDate(banking.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <BankLogo bankName={banking.bankName} />
                    <span className="ml-2">{banking.bankName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {banking.reference}
                  </div>
                  <div className="text-sm text-gray-500">
                    {banking.accountNumber.slice(-4)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {banking.cashAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {banking.cardAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                  {(banking.cashAmount + banking.cardAmount).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    banking.verified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {banking.verified ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left">
                  {banking.verified ? (
                    <button
                      onClick={() => onUnverify(banking.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Unverify"
                    >
                      <XCircleIcon className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onVerify(banking.id)}
                      className="text-green-600 hover:text-green-800 p-1"
                      title="Verify"
                    >
                      <CheckCircleIcon className="h-5 w-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Helper component for bank logos
function BankLogo({ bankName }: { bankName: string }) {
  const getLogoColor = () => {
    switch(bankName) {
      case 'FNB': return 'bg-green-500';
      case 'ABSA': return 'bg-red-500';
      case 'Standard Bank': return 'bg-blue-500';
      case 'Nedbank': return 'bg-green-600';
      case 'Capitec': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`h-6 w-6 rounded-full ${getLogoColor()} flex items-center justify-center text-white text-xs font-bold`}>
      {bankName.charAt(0)}
    </div>
  );
}

// Helper function
function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-ZA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}