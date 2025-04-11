
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import { ExpenseList } from "@/components/expenses/ExpenseList";
import { BudgetProgress } from "@/components/budget/BudgetProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Expenses() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 ml-0 md:ml-64">
        <div className="p-6 pt-16 md:pt-6">
          <Header title="Expenses" />
          
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="add">Add New</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ExpenseList />
                </div>
                
                <div className="lg:col-span-1">
                  <div className="rounded-xl border p-6 card-gradient">
                    <BudgetProgress />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="add">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ExpenseForm />
                </div>
                
                <div className="lg:col-span-1">
                  <div className="rounded-xl border p-6 card-gradient">
                    <h2 className="text-lg font-semibold mb-4">Quick Tips</h2>
                    <ul className="space-y-3 text-sm">
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Use the location field to track where you spend.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Categorize expenses accurately for better insights.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Add descriptions to help remember purchases.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        <span>Use income type for money coming in.</span>
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
