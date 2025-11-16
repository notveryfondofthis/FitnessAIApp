import { Calendar, Home, Camera } from 'lucide-react';
import { Button } from './ui/button';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home className="w-5 h-5" />
  },
  {
    id: 'planner',
    label: 'Planner',
    icon: <Calendar className="w-5 h-5" />
  },
  {
    id: 'food-scanner',
    label: 'Food Scanner',
    icon: <Camera className="w-5 h-5" />
  }
];

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="bg-background border-t border-border p-1 sm:p-2">
      <div className="flex items-center justify-center gap-2 sm:gap-8 md:gap-12">
        {/* Home Tab */}
        <Button
          variant={activeTab === 'home' ? "default" : "ghost"}
          className="flex flex-col items-center gap-0.5 sm:gap-1 h-auto py-1 sm:py-2 px-1.5 sm:px-4 min-w-0 text-[10px] sm:text-xs"
          onClick={() => onTabChange('home')}
        >
          <Home className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
          <span>Home</span>
        </Button>

        {/* Planner Tab */}
        <Button
          variant={activeTab === 'planner' ? "default" : "ghost"}
          className="flex flex-col items-center gap-0.5 sm:gap-1 h-auto py-1 sm:py-2 px-1.5 sm:px-4 min-w-0 text-[10px] sm:text-xs"
          onClick={() => onTabChange('planner')}
        >
          <Calendar className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
          <span>Planner</span>
        </Button>

        {/* Food Scanner Tab */}
        <Button
          variant={activeTab === 'food-scanner' ? "default" : "ghost"}
          className="flex flex-col items-center gap-0.5 sm:gap-1 h-auto py-1 sm:py-2 px-1.5 sm:px-4 min-w-0 text-[10px] sm:text-xs"
          onClick={() => onTabChange('food-scanner')}
        >
          <Camera className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
          <span className="whitespace-nowrap">Food Scanner</span>
        </Button>
      </div>
    </nav>
  );
}