export interface CreateDebt {
  amount: number;
  description: string;
  debtorId: number
  creditorId: number;
}