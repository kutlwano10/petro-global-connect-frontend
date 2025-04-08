'use client';

import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Modal } from '@/components/ui/modal';

interface Creditor {
  id: string;
  name: string;
  contact: string;
  creditLimit: number;
  balance: number;
}

type CreditorStatus = 'pending' | 'partially-paid' | 'paid';

interface CreditorSale {
  id: string;
  date: Date;
  creditorId: string;
  invoiceNumber: string;
  amount: number;
  fuelType: string;
  liters: number;
  pricePerLiter: number;
  status: CreditorStatus
  notes?: string;
}

export function CreditorSales() {
  const [creditors, setCreditors] = useState<Creditor[]>([
    {
      id: '1',
      name: 'ABC Transport',
      contact: '0712345678',
      creditLimit: 50000,
      balance: 12500
    },
    // Add more creditors
  ]);

  const [sales, setSales] = useState<CreditorSale[]>([
    {
      id: '1',
      date: new Date('2024-07-20'),
      creditorId: '1',
      invoiceNumber: 'INV-2024-001',
      amount: 12500,
      fuelType: 'Diesel 50ppm',
      liters: 592.41,
      pricePerLiter: 21.10,
      status: 'pending',
      notes: 'Monthly delivery'
    },
    // Add more sales
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSale, setCurrentSale] = useState<Partial<CreditorSale> | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddSale = () => {
    setCurrentSale({
      date: new Date(),
      status: 'pending'
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleEditSale = (sale: CreditorSale) => {
    setCurrentSale(sale);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSaveSale = () => {
    if (!currentSale) return;

    // Ensure status is properly typed
    const status: CreditorStatus = currentSale.status || 'pending';

    if (isEditing && currentSale.id) {
      // Update existing sale with proper status type
      setSales(sales.map(s => 
        s.id === currentSale.id ? { 
          ...s, 
          ...currentSale,
          status: status
        } : s
      ));
    } else {
      // Add new sale with proper status type
      const newSale: CreditorSale = {
        ...currentSale,
        id: Date.now().toString(),
        invoiceNumber: `INV-${new Date().getFullYear()}-${sales.length + 1}`,
        status: status,
        date: currentSale.date || new Date(),
        creditorId: currentSale.creditorId || '',
        fuelType: currentSale.fuelType || '',
        liters: currentSale.liters || 0,
        pricePerLiter: currentSale.pricePerLiter || 0,
        amount: currentSale.amount || 0
      } as CreditorSale;
      setSales([...sales, newSale]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteSale = (id: string) => {
    setSales(sales.filter(s => s.id !== id));
  };

  const handlePayment = (id: string, amount: number) => {
    const sale = sales.find(s => s.id === id);
    if (!sale) return;

    const newStatus: CreditorStatus = amount >= sale.amount ? 'paid' : 'partially-paid';

    const updatedSales = sales.map(s => 
      s.id === id ? { 
        ...s, 
        status: newStatus
      } : s
    );

    const creditor = creditors.find(c => c.id === sale.creditorId);
    if (creditor) {
      const updatedCreditors = creditors.map(c => 
        c.id === creditor.id ? { 
          ...c, 
          balance: Math.max(0, c.balance - amount) 
        } : c
      );
      setCreditors(updatedCreditors);
    }

    setSales(updatedSales);
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Creditor Sales</h2>
        <button
          onClick={handleAddSale}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Creditor Sale</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface p-4 rounded-lg shadow">
          <p className="text-sm font-medium text-gray-500">Total Outstanding</p>
          <p className="text-2xl font-bold">
            R{creditors.reduce((sum, c) => sum + c.balance, 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-surface p-4 rounded-lg shadow">
          <p className="text-sm font-medium text-gray-500">Active Creditors</p>
          <p className="text-2xl font-bold">{creditors.length}</p>
        </div>
        <div className="bg-surface p-4 rounded-lg shadow">
          <p className="text-sm font-medium text-gray-500">Pending Invoices</p>
          <p className="text-2xl font-bold">
            {sales.filter(s => s.status !== 'paid').length}
          </p>
        </div>
      </div>

      {/* Sales Table */}
      <div className="overflow-x-auto bg-surface rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-surface">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Creditor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fuel Type
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Liters
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-gray-200 dark:divide-gray-700">
            {sales.map((sale) => {
              const creditor = creditors.find(c => c.id === sale.creditorId);
              return (
                <tr key={sale.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {sale.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {creditor?.name || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {sale.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {sale.fuelType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {sale.liters.toFixed(2)} L
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                    R{sale.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      sale.status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : sale.status === 'partially-paid' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button
                      onClick={() => handleEditSale(sale)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteSale(sale.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    {sale.status !== 'paid' && (
                      <button
                        onClick={() => {
                          const amount = parseFloat(
                            prompt(`Enter payment amount (Invoice: R${sale.amount.toFixed(2)})`) || '0'
                          );
                          if (amount > 0) handlePayment(sale.id, amount);
                        }}
                        className="p-1 text-green-600 hover:text-green-800"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Creditor Balances */}
      <div className="bg-surface p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Creditor Balances</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-primary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Creditor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credit Limit
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Available
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-gray-200 dark:divide-gray-700">
              {creditors.map((creditor) => (
                <tr key={creditor.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {creditor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {creditor.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    R{creditor.creditLimit.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium">
                    R{creditor.balance.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    R{(creditor.creditLimit - creditor.balance).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Sale Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 max-w-2xl w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {isEditing ? 'Edit' : 'Add'} Creditor Sale
            </h2>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Creditor</label>
                <select
                  value={currentSale?.creditorId || ''}
                  onChange={(e) => setCurrentSale({...currentSale, creditorId: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select Creditor</option>
                  {creditors.map((creditor) => (
                    <option key={creditor.id} value={creditor.id}>
                      {creditor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={currentSale?.date ? new Date(currentSale.date).toISOString().split('T')[0] : ''}
                  onChange={(e) => setCurrentSale({...currentSale, date: new Date(e.target.value)})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Fuel Type</label>
                <select
                  value={currentSale?.fuelType || ''}
                  onChange={(e) => setCurrentSale({...currentSale, fuelType: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select Fuel</option>
                  <option value="Petrol 95">Petrol 95</option>
                  <option value="Petrol 93">Petrol 93</option>
                  <option value="Diesel 50ppm">Diesel 50ppm</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Liters</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={currentSale?.liters || ''}
                  onChange={(e) => setCurrentSale({...currentSale, liters: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Price/Liter</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={currentSale?.pricePerLiter || ''}
                  onChange={(e) => {
                    const price = parseFloat(e.target.value);
                    setCurrentSale({
                      ...currentSale,
                      pricePerLiter: price,
                      amount: (currentSale?.liters || 0) * price
                    });
                  }}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Amount (R)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={currentSale?.amount || ''}
                onChange={(e) => setCurrentSale({...currentSale, amount: parseFloat(e.target.value)})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={currentSale?.status || 'pending'}
                onChange={(e) => setCurrentSale({...currentSale, status: e.target.value as any})}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="pending">Pending</option>
                <option value="partially-paid">Partially Paid</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                value={currentSale?.notes || ''}
                onChange={(e) => setCurrentSale({...currentSale, notes: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSale}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}