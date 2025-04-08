export type BankName = 'FNB' | 'ABSA' | 'Standard Bank' | 'Nedbank' | 'Capitec';

export interface DailyBanking {
  id: string;
  date: Date;
  cashAmount: number;
  cardAmount: number;
  bankName: BankName;
  accountNumber: string;
  reference: string;
  depositedBy: string;
  verified: boolean;
  bankStatementMatch?: {
    amount: number;
    transactionDate: Date;
    reference: string;
  };
}

export interface BankStatement {
  id: string;
  bankName: BankName;
  accountNumber: string;
  transactionDate: Date;
  amount: number;
  description: string;
  reference: string;
}