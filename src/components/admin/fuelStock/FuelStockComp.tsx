import React from "react";
import FuelStockCard from "./FuelStockCard";
import FuelStockTable from "./FuelStockTable";
import { FuelStockSummary, FuelTransaction } from "@/interfaces/fuel/fuel";

type FuelStockProps = {
  summary: FuelStockSummary;
  transactions: FuelTransaction[];
};

export function FuelStockComp({ summary, transactions }: FuelStockProps) {
  const getTrend = (): "up" | "down" | "neutral" => {
    // Implement logic based on your business rules
    return "neutral";
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Fuel Stock</h1>
      <p className="text-gray-400 mb-6">
        Monitor fuel levels and transactions across your stations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <FuelStockCard
          title="Total Fuel Stock"
          value={summary.totalStock}
          unit="L"
          trend={summary.criticalLevel ? "down" : "neutral"}
          description={
            summary.criticalLevel
              ? "Low stock - consider restocking"
              : `Approx. ${summary.daysRemaining} days remaining`
          }
        />
        <FuelStockCard
          title="Daily Usage"
          value={summary.dailyUsage}
          unit="L"
          trend={getTrend()}
          description="Average over last 7 days"
        />
        <FuelStockCard
          title="Last Restock"
          value={
            summary.lastRestockDate
              ? summary.lastRestockDate.toLocaleDateString()
              : "Never"
          }
          description={
            summary.lastRestockDate
              ? `${Math.floor(
                  (new Date().getTime() - summary.lastRestockDate.getTime()) /
                    (1000 * 60 * 60 * 24)
                )}  days ago`
              : "No restock recorded"
          }
        />
      </div>

      <FuelStockTable transactions={transactions} />
    </div>
  );
}
