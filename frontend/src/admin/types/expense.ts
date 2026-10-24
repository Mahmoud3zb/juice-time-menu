export type ExpenseType = "daily" | "after_closing";

export interface ExpenseCategory {
  _id: string;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExpenseItem {
  _id: string;
  amount: number;
  description?: string;
  expenseType?: ExpenseType;
  expenseDate: string;
  createdAt: string;
  updatedAt?: string;
  expenseCategoryID: ExpenseCategory | string;
}

export interface DailyReportData {
  date: string;
  revenue: number;
  revenueNotes?: string;
  dailyExpenses: number;
  afterClosingExpenses: number;
  totalExpenses: number;
  expensesCount: number;
  netProfit: number;
  expenses: ExpenseItem[];
}

export interface MonthlyCategoryTotal {
  categoryID: string;
  categoryName: string;
  totalAmount: number;
  expensesCount: number;
}

export interface MonthlyDailyTotal {
  date: string;
  revenue: number;
  dailyExpenses: number;
  afterClosingExpenses: number;
  totalAmount: number;
  expensesCount: number;
  netProfit: number;
}

export interface MonthlyReportData {
  month: number;
  year: number;
  totalRevenue: number;
  totalDailyExpenses: number;
  totalAfterClosingExpenses: number;
  totalExpenses: number;
  expensesCount: number;
  netProfit: number;
  dailyTotals: MonthlyDailyTotal[];
  categories: MonthlyCategoryTotal[];
}
