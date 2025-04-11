
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { budgets, categories, formatCurrency, getCategoryById } from "@/utils/mockData";
import { AlertTriangle, Plus } from "lucide-react";

export function BudgetProgress() {
  // Sort budgets by spent percentage
  const sortedBudgets = [...budgets].sort((a, b) => (b.spent / b.amount) - (a.spent / a.amount));
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Budget Overview</h2>
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          <span>New Budget</span>
        </Button>
      </div>
      
      <div className="space-y-5">
        {sortedBudgets.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No budgets set. Create a budget to start tracking your spending.
          </div>
        ) : (
          sortedBudgets.map((budget) => {
            const category = getCategoryById(budget.categoryId);
            const percentSpent = Math.round((budget.spent / budget.amount) * 100);
            
            // Determine warning status
            let status = "normal";
            if (percentSpent >= 90) {
              status = "critical";
            } else if (percentSpent >= 75) {
              status = "warning";
            }
            
            return (
              <div key={budget.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {category && (
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                    )}
                    <span className="font-medium">{category?.name || "Unnamed Budget"}</span>
                    
                    {status === "critical" && (
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(budget.spent)} of {formatCurrency(budget.amount)}
                  </div>
                </div>
                
                <Progress 
                  value={percentSpent}
                  className={`h-2 ${
                    status === "critical" 
                      ? "bg-red-200" 
                      : status === "warning" 
                      ? "bg-yellow-200" 
                      : "bg-blue-200"
                  }`}
                  indicatorClassName={
                    status === "critical" 
                      ? "bg-red-500" 
                      : status === "warning" 
                      ? "bg-yellow-500" 
                      : ""
                  }
                />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{percentSpent}%</span>
                  <span>
                    {budget.period.charAt(0).toUpperCase() + budget.period.slice(1)} Budget
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
