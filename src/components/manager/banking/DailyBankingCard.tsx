interface DailyBankingCardProps {
    cashAmount: number;
    cardAmount: number;
    verifiedCount: number;
  }
  
  export function DailyBankingCard({ cashAmount, cardAmount, verifiedCount }: DailyBankingCardProps) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-secondary p-4 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Cash Deposited</h3>
          <p className="text-2xl font-bold">R{cashAmount.toFixed(2)}</p>
        </div>
        <div className="bg-secondary p-4 rounded-lg shadow-xl border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Card Payments</h3>
          <p className="text-2xl font-bold">R{cardAmount.toFixed(2)}</p>
        </div>
        <div className="bg-secondary p-4 rounded-lg shadow border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500">Verified</h3>
          <p className="text-2xl font-bold">{verifiedCount}</p>
        </div>
      </div>
    );
  }