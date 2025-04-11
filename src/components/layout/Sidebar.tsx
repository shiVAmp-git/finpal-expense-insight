
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  CreditCard,
  Home,
  Menu,
  PieChart,
  Settings,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const SidebarLink = ({ to, icon, label, isActive, onClick }: SidebarLinkProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent group",
      isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
    )}
    onClick={onClick}
  >
    <div className="flex items-center justify-center w-8 h-8">
      {icon}
    </div>
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile sidebar toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar transition-transform transform md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2" onClick={closeSidebar}>
              <div className="rounded-full p-1.5 primary-gradient">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-sidebar-foreground">FinPal</h1>
            </Link>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={closeSidebar}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Navigation */}
          <div className="flex flex-col gap-1.5 mt-2">
            <SidebarLink
              to="/"
              icon={<Home className="h-5 w-5" />}
              label="Dashboard"
              isActive={isActive("/")}
              onClick={closeSidebar}
            />
            <SidebarLink
              to="/expenses"
              icon={<CreditCard className="h-5 w-5" />}
              label="Expenses"
              isActive={isActive("/expenses")}
              onClick={closeSidebar}
            />
            <SidebarLink
              to="/budget"
              icon={<PieChart className="h-5 w-5" />}
              label="Budget"
              isActive={isActive("/budget")}
              onClick={closeSidebar}
            />
            <SidebarLink
              to="/analytics"
              icon={<BarChart3 className="h-5 w-5" />}
              label="Analytics"
              isActive={isActive("/analytics")}
              onClick={closeSidebar}
            />
            <SidebarLink
              to="/settings"
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              isActive={isActive("/settings")}
              onClick={closeSidebar}
            />
          </div>
          
          {/* Footer */}
          <div className="mt-auto pt-4">
            <div className="rounded-xl p-4 bg-sidebar-accent/30">
              <h3 className="text-sm font-medium text-sidebar-foreground mb-2">FinPal Pro</h3>
              <p className="text-xs text-sidebar-foreground/70 mb-3">
                Unlock all features with our premium plan
              </p>
              <Button size="sm" className="w-full primary-gradient" variant="default">
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}
