
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { RealExpenseList } from "@/components/expenses/RealExpenseList";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 ml-0 md:ml-64">
        <div className="p-6 pt-16 md:pt-6">
          <Header title="Dashboard" />
          
          <DashboardOverview />
          
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <RealExpenseList />
          </div>
        </div>
      </div>
    </div>
  );
}
