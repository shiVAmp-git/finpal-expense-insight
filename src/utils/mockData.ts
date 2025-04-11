
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  categoryId: string;
  type: 'income' | 'expense';
  location?: {
    name: string;
    coordinates?: [number, number];
  };
}

export interface Budget {
  id: string;
  categoryId: string;
  amount: number;
  period: 'weekly' | 'monthly' | 'yearly';
  spent: number;
}

export interface SavingGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  startDate: string;
}

// Mock user data
export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=4361EE&color=fff',
};

// Mock categories
export const categories: Category[] = [
  { id: '1', name: 'Food & Dining', color: '#4CC9F0', icon: 'utensils' },
  { id: '2', name: 'Transportation', color: '#7209B7', icon: 'car' },
  { id: '3', name: 'Shopping', color: '#F72585', icon: 'shopping-bag' },
  { id: '4', name: 'Entertainment', color: '#FF9F1C', icon: 'film' },
  { id: '5', name: 'Housing', color: '#2EC4B6', icon: 'home' },
  { id: '6', name: 'Utilities', color: '#3A0CA3', icon: 'bolt' },
  { id: '7', name: 'Healthcare', color: '#E71D36', icon: 'heart-pulse' },
  { id: '8', name: 'Education', color: '#4361EE', icon: 'book' },
  { id: '9', name: 'Personal Care', color: '#FB5607', icon: 'user' },
  { id: '10', name: 'Income', color: '#06D6A0', icon: 'wallet' },
];

// Mock transactions
const generateTransactions = (): Transaction[] => {
  // Current date
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Generate transactions for the last 60 days
  const transactions: Transaction[] = [];
  
  for (let i = 0; i < 60; i++) {
    const date = new Date(currentYear, currentMonth, now.getDate() - i);
    const formattedDate = date.toISOString();
    
    // Generate 1-3 transactions per day
    const transactionsPerDay = Math.floor(Math.random() * 3) + 1;
    
    for (let j = 0; j < transactionsPerDay; j++) {
      // Random category (excluding income category for expenses)
      const categoryIndex = Math.floor(Math.random() * 9);
      
      transactions.push({
        id: `trans-${i}-${j}`,
        amount: Math.floor(Math.random() * 15000) / 100 + 5, // $5 - $150
        description: `Transaction ${j+1} on ${date.toLocaleDateString()}`,
        date: formattedDate,
        categoryId: categories[categoryIndex].id,
        type: 'expense',
        location: {
          name: 'Local Store',
        },
      });
    }
    
    // Add occasional income transactions
    if (i % 15 === 0) {
      transactions.push({
        id: `income-${i}`,
        amount: Math.floor(Math.random() * 300000) / 100 + 1000, // $1000 - $4000
        description: 'Monthly Income',
        date: formattedDate,
        categoryId: '10', // Income category
        type: 'income',
      });
    }
  }
  
  return transactions;
};

export const transactions: Transaction[] = generateTransactions();

// Mock budgets
export const budgets: Budget[] = [
  {
    id: '1',
    categoryId: '1',
    amount: 500,
    period: 'monthly',
    spent: 320,
  },
  {
    id: '2',
    categoryId: '2',
    amount: 250,
    period: 'monthly',
    spent: 180,
  },
  {
    id: '3',
    categoryId: '3',
    amount: 300,
    period: 'monthly',
    spent: 275,
  },
  {
    id: '4',
    categoryId: '4',
    amount: 200,
    period: 'monthly',
    spent: 120,
  },
  {
    id: '5',
    categoryId: '5',
    amount: 1200,
    period: 'monthly',
    spent: 1200,
  },
];

// Get current date for saving goals
const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();

// Mock saving goals
export const savingGoals: SavingGoal[] = [
  {
    id: '1',
    name: 'Vacation',
    targetAmount: 2000,
    currentAmount: 750,
    deadline: new Date(currentYear, currentMonth + 6, 1).toISOString(),
    startDate: new Date(currentYear, currentMonth - 2, 1).toISOString(),
  },
  {
    id: '2',
    name: 'New Laptop',
    targetAmount: 1500,
    currentAmount: 900,
    deadline: new Date(currentYear, currentMonth + 2, 15).toISOString(),
    startDate: new Date(currentYear, currentMonth - 3, 15).toISOString(),
  },
];

// Helper functions for data manipulation
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getTransactionsByCategory = (categoryId: string): Transaction[] => {
  return transactions.filter(transaction => transaction.categoryId === categoryId);
};

export const getSpendingByCategory = (): Record<string, number> => {
  const spending: Record<string, number> = {};
  
  categories.forEach(category => {
    spending[category.id] = 0;
  });
  
  transactions.forEach(transaction => {
    if (transaction.type === 'expense') {
      spending[transaction.categoryId] += transaction.amount;
    }
  });
  
  return spending;
};

export const getTotalIncome = (): number => {
  return transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const getTotalExpenses = (): number => {
  return transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const getTransactionsByMonth = (): Record<string, number> => {
  const monthlyData: Record<string, number> = {};
  
  // Initialize last 6 months
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${month.getFullYear()}-${month.getMonth() + 1}`;
    monthlyData[monthKey] = 0;
  }
  
  transactions.forEach(transaction => {
    if (transaction.type === 'expense') {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (monthlyData[monthKey] !== undefined) {
        monthlyData[monthKey] += transaction.amount;
      }
    }
  });
  
  return monthlyData;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

export const getMonthName = (monthNum: number): string => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return months[monthNum - 1];
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric', 
    year: 'numeric'
  });
};
