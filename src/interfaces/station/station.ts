export type Station = {
    id: number;
    name: string;
    logo: string;
    location: string;
    fuelStock: string;
    sales: string;
    status: 'Active' | 'Low Stock' | 'Closed';
  };