
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { SpendingChart } from "@/components/charts/SpendingChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories, formatCurrency, getSpendingByCategory, getTotalExpenses, getTotalIncome, transactions } from "@/utils/mockData";
import { ArrowDownRight, ArrowUpRight, TrendingUp } from "lucide-react";

export default function Analytics() {
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const savings = totalIncome - totalExpenses;
  const savingsRate = (savings / totalIncome) * 100;
  
  // Calculate spending by category for display
  const categorySpending = getSpendingByCategory();
  const categorySummary = categories
    .filter(category => category.id !== '10') // Exclude income
    .map(category => ({
      id: category.id,
      name: category.name,
      color: category.color,
      amount: categorySpending[category.id] || 0,
      percentage: ((categorySpending[category.id] || 0) / totalExpenses) * 100
    }))
    .sort((a, b) => b.amount - a.amount);
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 ml-0 md:ml-64">
        <div className="p-6 pt-16 md:pt-6">
          <Header title="Analytics" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalIncome)}</div>
                <div className="flex items-center mt-1 text-xs">
                  <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" />
                  <span className="text-green-500 font-medium">12%</span>
                  <span className="text-muted-foreground ml-1">vs last period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
                <div className="flex items-center mt-1 text-xs">
                  <ArrowDownRight className="w-3 h-3 mr-1 text-red-500" />
                  <span className="text-red-500 font-medium">5%</span>
                  <span className="text-muted-foreground ml-1">vs last period</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{savingsRate.toFixed(1)}%</div>
                <div className="flex items-center mt-1 text-xs">
                  <TrendingUp className="w-3 h-3 mr-1 text-blue-500" />
                  <span className="text-blue-500 font-medium">2.3%</span>
                  <span className="text-muted-foreground ml-1">vs last period</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <SpendingChart 
              title="Monthly Spending Trends" 
              description="Your spending over time"
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>How your money is distributed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categorySummary.slice(0, 5).map((category) => (
                    <div key={category.id}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          />
                          <span>{category.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">
                            {category.percentage.toFixed(1)}%
                          </span>
                          <span className="font-medium">
                            {formatCurrency(category.amount)}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${category.percentage}%`,
                            backgroundColor: category.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Insights</CardTitle>
              <CardDescription>AI-powered analysis of your spending habits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-medium mb-2">Spending Pattern</h3>
                  <p className="text-sm text-muted-foreground">
                    Your highest spending category is <strong>Food & Dining</strong>, accounting for 
                    32% of your total expenses. This is 15% higher than the previous month.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h3 className="font-medium mb-2">Saving Opportunity</h3>
                  <p className="text-sm text-muted-foreground">
                    You could save up to <strong>{formatCurrency(totalExpenses * 0.15)}</strong> monthly 
                    by reducing your spending on non-essential items in the Shopping category.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <h3 className="font-medium mb-2">Financial Health Score</h3>
                  <p className="text-sm text-muted-foreground">
                    Your current financial health score is <strong>72/100</strong>. Increase your 
                    savings rate to 20% to improve your score.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
