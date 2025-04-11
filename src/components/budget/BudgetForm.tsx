
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/utils/mockData";
import { useToast } from "@/hooks/use-toast";
import { DollarSign } from "lucide-react";

export function BudgetForm() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [period, setPeriod] = useState<"weekly" | "monthly" | "yearly">("monthly");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Simple validation
    if (!amount || !category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // For demo purposes, we're just showing a success toast
    toast({
      title: "Budget created",
      description: `Your budget has been set successfully.`,
    });

    // Reset form
    setAmount("");
    setCategory("");
    setPeriod("monthly");
  };

  return (
    <div className="rounded-xl border p-6 card-gradient">
      <h2 className="text-lg font-semibold mb-4">Create New Budget</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter(cat => cat.id !== '10') // Exclude income category
                  .map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Budget Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                id="amount"
                type="number"
                placeholder="0.00" 
                className="pl-9"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="period">Time Period</Label>
          <Select 
            value={period} 
            onValueChange={(value: "weekly" | "monthly" | "yearly") => setPeriod(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" className="primary-gradient">
            Create Budget
          </Button>
        </div>
      </form>
    </div>
  );
}
