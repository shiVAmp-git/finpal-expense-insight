
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, formatCurrency, formatDate, getCategoryById, transactions } from "@/utils/mockData";
import { ArrowUpDown, Download, MoreHorizontal, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function ExpenseList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { toast } = useToast();
  
  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter(transaction => {
      // Filter by search query
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      
      // Filter by category
      const matchesCategory = categoryFilter 
        ? transaction.categoryId === categoryFilter 
        : true;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Sort by date
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    })
    .slice(0, 10); // Limit to 10 items for demo

  // Export data functions
  const exportToCSV = () => {
    const csvHeader = 'Date,Description,Category,Amount,Type\n';
    const csvRows = filteredTransactions.map(transaction => {
      const category = getCategoryById(transaction.categoryId);
      const amount = transaction.type === 'income' ? transaction.amount : -transaction.amount;
      return `${formatDate(transaction.date)},${transaction.description},${category?.name || 'Uncategorized'},${amount},${transaction.type}`;
    }).join('\n');
    
    const csvContent = `${csvHeader}${csvRows}`;
    downloadFile(csvContent, 'expenses.csv', 'text/csv');
    
    toast({
      title: "Export successful",
      description: "Your expenses have been exported as CSV",
    });
  };
  
  const exportToJSON = () => {
    const jsonData = filteredTransactions.map(transaction => {
      const category = getCategoryById(transaction.categoryId);
      return {
        id: transaction.id,
        date: transaction.date,
        description: transaction.description,
        category: category?.name || 'Uncategorized',
        amount: transaction.amount,
        type: transaction.type
      };
    });
    
    const jsonContent = JSON.stringify(jsonData, null, 2);
    downloadFile(jsonContent, 'expenses.json', 'application/json');
    
    toast({
      title: "Export successful",
      description: "Your expenses have been exported as JSON",
    });
  };
  
  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 items-end mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-48">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-categories">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Export Format</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={exportToCSV}>
              CSV File
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportToJSON}>
              JSON File
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((transaction) => {
                const category = getCategoryById(transaction.categoryId);
                return (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {formatDate(transaction.date)}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {category && (
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          ></div>
                        )}
                        {category?.name || "Uncategorized"}
                      </div>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${transaction.type === 'income' ? 'text-green-600' : ''}`}>
                      {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
