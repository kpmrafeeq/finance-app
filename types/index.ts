export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  color: string;
}

export interface MonthlySpending {
  month: string;
  amount: number;
}

export interface CategorySpending {
  name: string;
  amount: number;
  color: string;
}