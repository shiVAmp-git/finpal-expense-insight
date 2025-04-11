
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { categories, formatCurrency, getCategoryById, getMonthName, getSpendingByCategory, getTransactionsByMonth, transactions } from '@/utils/mockData';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface ChartProps {
  type?: 'bar' | 'pie' | 'line';
  title: string;
  description?: string;
}

export function SpendingChart({ type = 'bar', title, description }: ChartProps) {
  // Monthly data
  const monthlySpending = getTransactionsByMonth();
  const monthlyData = Object.entries(monthlySpending).map(([key, value]) => {
    const [year, monthNum] = key.split('-');
    return {
      name: getMonthName(parseInt(monthNum)),
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
    .filter(item => item.value > 0);

  // Last 7 days data
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const dailyTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return (
        transaction.type === 'expense' &&
        transactionDate.getDate() === date.getDate() &&
        transactionDate.getMonth() === date.getMonth() &&
        transactionDate.getFullYear() === date.getFullYear()
      );
    });
    
    const total = dailyTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      amount: total,
      date: date.toISOString()
    };
  }).reverse();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="bar" className="w-full">
          <div className="px-6">
            <TabsList className="grid grid-cols-3 w-full max-w-[400px] mb-4">
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="line">Line Chart</TabsTrigger>
              <TabsTrigger value="pie">Pie Chart</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="bar" className="h-[350px] px-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `$${value}`} 
                  width={60}
                />
                <Tooltip 
                  formatter={(value) => [`${formatCurrency(value as number)}`, 'Spending']}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                />
                <Bar dataKey="amount" fill="#4361EE" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="line" className="h-[350px] px-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dailyData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `$${value}`} 
                  width={60}
                />
                <Tooltip 
                  formatter={(value) => [`${formatCurrency(value as number)}`, 'Spending']}
                  labelFormatter={(label) => `Day: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#4361EE" 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="pie" className="h-[350px] px-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  innerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
