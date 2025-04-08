"use client";
import { useState } from "react";
import { NozzleCard } from "./NozzleCard";
import { FuelSaleModal } from "./FuelSaleModal";
import { FuelProduct, Nozzle } from "@/interfaces/fuel/product";
import { TransactionHistory } from "./TransactionHistory";
import {
  mockNozzles,
  mockFuelProducts,
  generateMockTransactions,
} from "@/utils/mockFuelData";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { AdvancedFilter } from "@/components/ui/advanced-filter";

// Mock data (replace with real API calls)
// const mockFuelProducts: FuelProduct[] = [
//   { id: "1", name: "Petrol 95", pricePerLiter: 22.5, colorCode: "#3B82F6" },
//   { id: "2", name: "Diesel 50ppm", pricePerLiter: 21.0, colorCode: "#10B981" },
// ];

// const mockNozzles: Nozzle[] = [
//   { id: "1", number: "1", pumpId: "1", fuelProductId: "1", currentMeterReading: 5000, lastCalibrationDate: 06-02-2025, status: 'ACTIVE' },
//   { id: "2", number: "2", pumpId: "1", fuelProductId: "2", currentMeterReading: 3000, lastCalibrationDate: 06, status: 'ACTIVE' },
// ];

const mockSalespeople = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
];

export default function MeterReadings() {
  const [selectedNozzle, setSelectedNozzle] = useState<Nozzle | null>(null);
  const transactions = generateMockTransactions(10);

  const [statusFilter, setStatusFilter] = useState<string>();

  const [filters, setFilters] = useState({
    sort: "newest",
    dateRange: {} as { start?: Date; end?: Date },
    searchQuery: "",
  });

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ];

  const handleRecordSale = (saleData: {
    closingReading: number;
    pricePerLiter: number;
    salespersonId: string;
    paymentMethod: string;
    customerName?: string;
    vehicleReg?: string;
  }) => {
    // TODO: Send to API and update nozzle reading
    console.log("Sale recorded:", saleData);
  };

  return (
    <div className="p-6 ">
      
      <div className=" flex justify-between">
        <div>
        <h1 className="text-2xl font-bold">Fuel Dispensing</h1>
        <p className="text-gray-600">Manage nozzle readings and sales</p>
        </div>
      <AdvancedFilter
        onApply={(newFilter) => setFilters(newFilter)}
        onReset={() =>
          setFilters({
            sort: "newest",
            dateRange: {},
            searchQuery: "",
          })
        }
      />
      </div>

      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {mockNozzles.map((nozzle) => {
          const fuelProduct = mockFuelProducts.find(
            (p) => p.id === nozzle.fuelProductId
          );
          if (!fuelProduct) return null;

          return (
            <NozzleCard
              key={nozzle.id}
              nozzle={nozzle}
              fuelProduct={fuelProduct}
              onRecordSale={() => setSelectedNozzle(nozzle)}
            />
          );
        })}
      </div>

      {selectedNozzle && (
        <FuelSaleModal
          isOpen={!!selectedNozzle}
          onClose={() => setSelectedNozzle(null)}
          nozzle={selectedNozzle}
          fuelProduct={
            mockFuelProducts.find((p) => p.id === selectedNozzle.fuelProductId)!
          }
          salespeople={mockSalespeople}
          onSubmit={handleRecordSale}
        />
      )}

      <div>
        {/* <FilterDropdown
          options={statusOptions}
          selectedValue={statusFilter}
          onSelect={setStatusFilter}
          placeholder="Filter by Status"
          buttonClassName="border border-gray-300 rounded-lg"
        /> */}
        <TransactionHistory
          transactions={transactions}
          nozzles={mockNozzles}
          fuelProducts={mockFuelProducts}
          salespeople={mockSalespeople}
          className="mt-6"
        />
      </div>
    </div>
  );
}
