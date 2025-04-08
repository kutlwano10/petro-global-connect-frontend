import { Modal } from "@/components/ui/modal";
import { BankName, DailyBanking } from "@/interfaces/banking/banking";
import { useState } from "react";

interface BankTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (banking: Omit<DailyBanking, 'id' | 'verified'>) => void;
    banks: BankName[];
  }
  
  export function BankTransactionModal({ isOpen, onClose, onSubmit, banks }: BankTransactionModalProps) {
    const [form, setForm] = useState<Omit<DailyBanking, 'id' | 'verified'>>({
      date: new Date(),
      cashAmount: 0,
      cardAmount: 0,
      bankName: 'FNB',
      accountNumber: '',
      reference: '',
      depositedBy: ''
    });
  
    const handleSubmit = () => {
      onSubmit(form);
      onClose();
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Record Daily Banking</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Cash Amount (R)</label>
              <input
                type="number"
                value={form.cashAmount}
                onChange={(e) => setForm({...form, cashAmount: Number(e.target.value)})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Card Amount (R)</label>
              <input
                type="number"
                value={form.cardAmount}
                onChange={(e) => setForm({...form, cardAmount: Number(e.target.value)})}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bank</label>
              <select
                value={form.bankName}
                onChange={(e) => setForm({...form, bankName: e.target.value as BankName})}
                className="w-full p-2 border rounded"
              >
                {banks.map(bank => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Account Number</label>
              <input
                value={form.accountNumber}
                onChange={(e) => setForm({...form, accountNumber: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="FNB/ABSA account number"
              />
            </div>
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Reference</label>
            <input
              value={form.reference}
              onChange={(e) => setForm({...form, reference: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="Deposit reference"
            />
          </div>
  
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Deposited By</label>
            <input
              value={form.depositedBy}
              onChange={(e) => setForm({...form, depositedBy: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="Manager name"
            />
          </div>
  
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit Banking
            </button>
          </div>
        </div>
      </Modal>
    );
  }