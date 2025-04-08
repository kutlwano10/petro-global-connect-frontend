import { DailyBanking, BankStatement, BankName } from '@/interfaces/banking/banking';

// Generate demo banking records (manager deposits)
export function generateDemoBankings(date: Date): DailyBanking[] {
  const baseAmount = Math.random() * 50000 + 10000; // R10,000 - R60,000
  
  return [
    {
      id: '1',
      date: new Date(date),
      cashAmount: Math.round(baseAmount * 0.7 * 100) / 100, // 70% cash
      cardAmount: Math.round(baseAmount * 0.3 * 100) / 100, // 30% card
      bankName: 'FNB',
      accountNumber: '62123456789', // FNB account
      reference: `ST-${date.getDate()}${date.getMonth() + 1}${date.getFullYear().toString().slice(-2)}-1`,
      depositedBy: 'John Doe',
      verified: false
    },
    {
      id: '2',
      date: new Date(date),
      cashAmount: Math.round(baseAmount * 0.6 * 100) / 100,
      cardAmount: Math.round(baseAmount * 0.4 * 100) / 100,
      bankName: 'ABSA',
      accountNumber: '4087654321', // ABSA account
      reference: `ABSA-${date.getDate()}${date.getMonth() + 1}-${Math.floor(Math.random() * 1000)}`,
      depositedBy: 'Jane Smith',
      verified: true,
      bankStatementMatch: {
        amount: Math.round(baseAmount * 100) / 100,
        transactionDate: new Date(date),
        reference: `ABSA-${date.getDate()}${date.getMonth() + 1}-${Math.floor(Math.random() * 1000)}`
      }
    }
  ];
}

// Generate demo bank statements (from FNB/ABSA)
export function generateDemoBankStatements(date: Date): BankStatement[] {
  return [
    {
      id: '101',
      bankName: 'FNB',
      accountNumber: '62123456789',
      transactionDate: new Date(date),
      amount: 38572.50,
      description: 'PETROL STATION DEPOSIT',
      reference: `ST-${date.getDate()}${date.getMonth() + 1}${date.getFullYear().toString().slice(-2)}-1`
    },
    {
      id: '102',
      bankName: 'ABSA',
      accountNumber: '4087654321',
      transactionDate: new Date(date),
      amount: 42318.20,
      description: 'FUEL DEPOSIT',
      reference: `ABSA-${date.getDate()}${date.getMonth() + 1}-${Math.floor(Math.random() * 1000)}`
    },
    {
      id: '103',
      bankName: 'FNB',
      accountNumber: '62123456789',
      transactionDate: new Date(date),
      amount: 1250.00,
      description: 'SERVICE FEE',
      reference: 'FNB-SERVICE-FEE'
    }
  ];
}