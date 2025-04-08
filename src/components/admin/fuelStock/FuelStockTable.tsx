import React from "react";
import { FuelTransaction } from "@/interfaces/fuel/fuel";

type FuelStockTableProps = {
  transactions: FuelTransaction[];
};

export default function FuelStockTable({ transactions }: FuelStockTableProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "RESTOCK":
        return "text-green-400";
      case "SALE":
        return "text-blue-400";
      case "ADJUSTMENT":
        return "text-yellow-400";
      case "LOSS":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="overflow-x-auto bg-surface text-text-primary p-4 rounded-lg shadow-xl">
      <table className="w-full text-left ">
        <thead>
          <tr className="border-b border-zinc-700">
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Type</th>
            <th className="py-3 px-4">Liters</th>
            <th className="py-3 px-4">Station</th>
            <th className="py-3 px-4">Notes</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-t border-zinc-700">
              <td className="py-3 px-4">{formatDate(transaction.date)}</td>
              <td className={`py-3 px-4 ${getTypeColor(transaction.type)}`}>
                {transaction.type}
              </td>
              <td className="py-3 px-4">{transaction.liters} L</td>
              <td className="py-3 px-4">{transaction.stationName}</td>
              <td className="py-3 px-4 text-gray-400">
                {transaction.notes || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
