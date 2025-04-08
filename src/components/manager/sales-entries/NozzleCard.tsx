import { Button } from "@/components/ui/button";
import { FuelProduct, Nozzle } from "@/interfaces/fuel/product"

interface Props {
  nozzle: Nozzle;
  fuelProduct: FuelProduct;
  onRecordSale: () => void; // Opens the modal
}

export function NozzleCard({ nozzle, fuelProduct, onRecordSale }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold">Nozzle {nozzle.number}</h3>
          <p className="text-sm text-gray-600">{fuelProduct.name}</p>
        </div>
        <span className="text-sm flex  items-center bg-secondary px-2  rounded-full">
          {nozzle.currentMeterReading.toLocaleString()} L
        </span>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="font-bold">R{fuelProduct.pricePerLiter.toFixed(2)}/L</p>
        <Button onClick={onRecordSale} >
          Record Sale
        </Button>
      </div>
    </div>
  );
}