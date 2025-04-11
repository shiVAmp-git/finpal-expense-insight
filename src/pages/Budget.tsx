
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { BudgetForm } from "@/components/budget/BudgetForm";
import { BudgetProgress } from "@/components/budget/BudgetProgress";
import { budgets, categories, getCategoryById, getSpendingByCategory } from "@/utils/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function Budget() {
  const categorySpending = getSpendingByCategory();
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 ml-0 md:ml-64">
        <div className="p-6 pt-16 md:pt-6">
          <Header title="Budget" />
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="create">Create Budget</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Budget Status</CardTitle>
                      <CardDescription>Track your spending against your budget</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {budgets.map((budget) => {
                          const category = getCategoryById(budget.categoryId);
                          const percentSpent = Math.round((budget.spent / budget.amount) * 100);
                          
                          return (
                            <div key={budget.id} className="p-4 rounded-lg bg-slate-50">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {category && (
                                    <div
                                      className="w-4 h-4 rounded-full"
                                      style={{ backgroundColor: category.color }}
                                    ></div>
                                  )}
                                  <span className="font-medium text-lg">{category?.name}</span>
                                </div>
                                <span className="font-medium">${budget.spent} / ${budget.amount}</span>
                              </div>
                              
                              <Progress value={percentSpent} className="h-2.5" />
                              
                              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                                <span>{percentSpent}% spent</span>
                                <span>{budget.period}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="rounded-xl border p-6 card-gradient h-full">
                    <BudgetProgress />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="create">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <BudgetForm />
                </div>
                
                <div className="lg:col-span-1">
                  <div className="rounded-xl border p-6 card-gradient">
                    <h2 className="text-lg font-semibold mb-4">Budget Tips</h2>
                    <ul className="space-y-3 text-sm">
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Start with your essential spending categories.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Set realistic budget goals you can stick to.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Review and adjust your budgets monthly.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
