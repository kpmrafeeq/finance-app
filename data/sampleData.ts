import { Transaction, Budget, MonthlySpending, CategorySpending } from '../types';
import * as colors from '../utils/colors';

// Sample transactions data
const transactions: Transaction[] = [
  {
    id: 'txn-1',
    description: 'Grocery Store',
    amount: 75.49,
    date: '2025-06-15',
    category: 'Food',
  },
  {
    id: 'txn-2',
    description: 'Gas Station',
    amount: 45.23,
    date: '2025-06-14',
    category: 'Transportation',
  },
  {
    id: 'txn-3',
    description: 'Coffee Shop',
    amount: 5.67,
    date: '2025-06-13',
    category: 'Food',
  },
  {
    id: 'txn-4',
    description: 'Movie Tickets',
    amount: 32.00,
    date: '2025-06-10',
    category: 'Entertainment',
  },
  {
    id: 'txn-5',
    description: 'Clothing Store',
    amount: 124.99,
    date: '2025-06-08',
    category: 'Shopping',
  },
  {
    id: 'txn-6',
    description: 'Restaurant',
    amount: 87.50,
    date: '2025-06-07',
    category: 'Food',
  },
  {
    id: 'txn-7',
    description: 'Uber Ride',
    amount: 18.75,
    date: '2025-06-06',
    category: 'Transportation',
  },
  {
    id: 'txn-8',
    description: 'Monthly Rent',
    amount: 1450.00,
    date: '2025-06-01',
    category: 'Housing',
  },
  {
    id: 'txn-9',
    description: 'Internet Bill',
    amount: 79.99,
    date: '2025-06-02',
    category: 'Utilities',
  },
  {
    id: 'txn-10',
    description: 'Pharmacy',
    amount: 32.47,
    date: '2025-06-04',
    category: 'Health',
  },
];

// Sample budget data
const budgets: Budget[] = [
  {
    id: 'budget-1',
    category: 'Food',
    amount: 500,
    spent: 168.66,
    color: colors.categories.food,
  },
  {
    id: 'budget-2',
    category: 'Transportation',
    amount: 200,
    spent: 63.98,
    color: colors.categories.transportation,
  },
  {
    id: 'budget-3',
    category: 'Entertainment',
    amount: 150,
    spent: 32,
    color: colors.categories.entertainment,
  },
  {
    id: 'budget-4',
    category: 'Shopping',
    amount: 300,
    spent: 124.99,
    color: colors.categories.shopping,
  },
  {
    id: 'budget-5',
    category: 'Housing',
    amount: 1500,
    spent: 1450,
    color: colors.categories.housing,
  },
  {
    id: 'budget-6',
    category: 'Utilities',
    amount: 200,
    spent: 79.99,
    color: colors.categories.utilities,
  },
  {
    id: 'budget-7',
    category: 'Health',
    amount: 100,
    spent: 32.47,
    color: colors.categories.health,
  },
];

// Sample monthly spending data
const monthlySpending: MonthlySpending[] = [
  { month: 'Jan', amount: 2312 },
  { month: 'Feb', amount: 1980 },
  { month: 'Mar', amount: 2350 },
  { month: 'Apr', amount: 2590 },
  { month: 'May', amount: 2190 },
  { month: 'Jun', amount: 1952 },
];

// Sample spending by category data
const spendingByCategory: CategorySpending[] = [
  { name: 'Food', amount: 168.66, color: colors.categories.food },
  { name: 'Transportation', amount: 63.98, color: colors.categories.transportation },
  { name: 'Entertainment', amount: 32, color: colors.categories.entertainment },
  { name: 'Shopping', amount: 124.99, color: colors.categories.shopping },
  { name: 'Housing', amount: 1450, color: colors.categories.housing },
  { name: 'Utilities', amount: 79.99, color: colors.categories.utilities },
  { name: 'Health', amount: 32.47, color: colors.categories.health },
];

export const sampleData = {
  transactions,
  budgets,
  monthlySpending,
  spendingByCategory,
};