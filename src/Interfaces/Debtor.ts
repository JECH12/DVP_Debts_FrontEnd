export interface DebtDto {
  id: number;
  debtorId: number;
  debtorName: string;
  creditorId: number;
  creditorName: string;
  amount: number;
  description: string;
  creation_date: string;
  stateId: number;
  stateName: string;
}