import { FuelTransaction, Nozzle, FuelProduct } from "@/interfaces/fuel/product";
import { format } from 'date-fns';

interface Props {
  transactions: FuelTransaction[];
  nozzles: Nozzle[];
  fuelProducts: FuelProduct[];
  salespeople: { id: string; name: string }[];
  className?: string;
}

export function TransactionHistory({
  transactions,
  nozzles,
  fuelProducts,
  salespeople,
  className = ""
}: Props) {
  const getPaymentMethodColor = (method: string) => {
    switch(method) {
      case 'CASH': return 'bg-green-100 text-green-800';
      case 'CARD': return 'bg-blue-100 text-blue-800';
      case 'FLEET': return 'bg-purple-100 text-purple-800';
      case 'MOBILE': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-surface rounded-lg shadow overflow-hidden ${className}`}>
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Fuel Transactions</h2>
        <p className="text-sm text-gray-500">{transactions.length} records</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-surface">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date/Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nozzle
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Volume
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attendant
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-gray-200">
            {transactions.map((tx) => {
              const nozzle = nozzles.find(n => n.id === tx.nozzleId);
              const product = fuelProducts.find(p => nozzle?.fuelProductId === p.id);
              const salesperson = salespeople.find(sp => sp.id === tx.salespersonId);
              const litersSold = tx.closingReading - tx.openingReading;
              const totalAmount = litersSold * tx.pricePerLiter;

              return (
                <tr key={tx.id} className="hover:bg-surface">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm ">
                      {format(tx.date, 'MMM dd')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(tx.date, 'HH:mm')}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium ">
                    {nozzle?.number || 'N/A'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm ">{product?.name}</div>
                    <div className="text-sm text-gray-500">
                      R{tx.pricePerLiter.toFixed(2)}/L
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                    {litersSold.toFixed(2)} L
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm  text-right">
                    R{totalAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPaymentMethodColor(tx.paymentMethod)}`}>
                      {tx.paymentMethod}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {salesperson?.name || 'Unknown'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}