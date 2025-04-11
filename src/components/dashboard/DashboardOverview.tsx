
import { ArrowDownIcon, ArrowUpIcon, DollarSign, Percent } from "lucide-react";
import { categories, formatCurrency, getTotalExpenses, getTotalIncome, getTransactionsByMonth, getSpendingByCategory } from "@/utils/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export function DashboardOverview() {
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const remainingBalance = totalIncome - totalExpenses;
  const savingsRate = (remainingBalance / totalIncome) * 100;
  
  // Recent months spending data
  const monthlySpending = getTransactionsByMonth();
  const monthlyData = Object.entries(monthlySpending).map(([key, value]) => {
    const [year, month] = key.split('-');
    return {
      month: `${month}/${year.slice(2)}`,
      amount: value
    };
  });
  
  // Category spending data
  const categorySpending = getSpendingByCategory();
  const categoryData = categories
    .filter(category => category.id !== '10') // Exclude income
    .map(category => ({
      name: category.name,
      value: categorySpending[category.id] || 0,
      color: category.color
    }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Top 5 categories
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Financial Overview Cards */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-sm font-medium">
              Total Income
            </CardTitle>
            <CardDescription>Current period</CardDescription>
          </div>
          <div className="rounded-full bg-green-100 p-2 text-green-600">
            <ArrowUpIcon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div>
          <div className="text-xs text-muted-foreground mt-1">
            +12% from last month
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <CardDescription>Current period</CardDescription>
          </div>
          <div className="rounded-full bg-red-100 p-2 text-red-600">
            <ArrowDownIcon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
          <div className="text-xs text-muted-foreground mt-1">
            +5% from last month
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-sm font-medium">
              Savings Rate
            </CardTitle>
            <CardDescription>Income - Expenses</CardDescription>
          </div>
          <div className="rounded-full bg-blue-100 p-2 text-blue-600">
            <Percent className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {savingsRate.toFixed(1)}%
          </div>
          <Progress value={savingsRate} className="h-2 mt-2" />
        </CardContent>
      </Card>
      
      {/* Monthly Spending Chart */}
      <Card className="col-span-full lg:col-span-2">
        <CardHeader>
          <CardTitle>Spending Trends</CardTitle>
          <CardDescription>Your spending over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4361EE" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4361EE" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => `$${value}`} 
                width={60}
              />
              <Tooltip 
                formatter={(value) => [`${formatCurrency(value as number)}`, 'Spending']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#4361EE" 
                fillOpacity={1} 
                fill="url(#colorAmount)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Top Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Top Spending Categories</CardTitle>
          <CardDescription>Where your money goes</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
