"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Nozzle, FuelProduct } from "@/interfaces/fuel/product";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  nozzle: Nozzle;
  fuelProduct: FuelProduct;
  salespeople: { id: string; name: string }[];
  onSubmit: (sale: {
    closingReading: number;
    pricePerLiter: number;
    salespersonId: string;
    paymentMethod: string;
    customerName?: string;
    vehicleReg?: string;
  }) => void;
}

export function FuelSaleModal({
  isOpen,
  onClose,
  nozzle,
  fuelProduct,
  salespeople,
  onSubmit,
}: Props) {
  const [closingReading, setClosingReading] = useState(nozzle.currentMeterReading);
  const [salespersonId, setSalespersonId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [customerName, setCustomerName] = useState("");
  const [vehicleReg, setVehicleReg] = useState("");

  const litersSold = closingReading - nozzle.currentMeterReading;
  const totalSale = litersSold * fuelProduct.pricePerLiter;

  const handleSubmit = () => {
    onSubmit({
      closingReading,
      pricePerLiter: fuelProduct.pricePerLiter,
      salespersonId,
      paymentMethod,
      customerName,
      vehicleReg,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Fuel Sale">
      <div className="space-y-4 text-text-secondary ">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-primary rounded">
            <p className="text-sm">Nozzle</p>
            <p className="font-bold">#{nozzle.number}</p>
          </div>
          <div className="p-3 bg-primary rounded">
            <p className="text-sm">Opening Reading</p>
            <p className="font-bold">{nozzle.currentMeterReading} L</p>
          </div>
        </div>

        <Input
          label="Closing Reading (L)"
          type="number"
          value={closingReading}
          onChange={(e) => setClosingReading(Number(e.target.value))}
          min={nozzle.currentMeterReading}
        />

        <div className="grid grid-cols-2 text-black gap-4">
          <div className="p-3 bg-blue-50 border border-blue-600  rounded">
            <p className="text-sm">Liters Sold</p>
            <p className="font-bold ">{litersSold.toFixed(2)} L</p>
          </div>
          <div className="p-3 bg-green-50 border border-green-600 rounded">
            <p className="text-sm">Total Sale</p>
            <p className="font-bold">R{totalSale.toFixed(2)}</p>
          </div>
        </div>

        <Select
          label="Salesperson"
          options={[
            { value: "", label: "Select Salesperson" },
            ...salespeople.map((sp) => ({ value: sp.id, label: sp.name })),
          ]}
          value={salespersonId}
          onChange={(e) => setSalespersonId(e.target.value)}
        />

        <Select
          label="Payment Method"
          options={[
            { value: "CASH", label: "Cash" },
            { value: "CARD", label: "Card" },
            { value: "FLEET", label: "Fleet Card" },
            { value: "OTHER", label: "Other" },
          ]}
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />

        <Input
          label="Customer Name (Optional)"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <Input
          label="Vehicle Registration (Optional)"
          value={vehicleReg}
          onChange={(e) => setVehicleReg(e.target.value)}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Complete Sale</Button>
        </div>
      </div>
    </Modal>
  );
}