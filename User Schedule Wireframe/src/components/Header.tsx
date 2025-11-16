import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface HeaderProps {
  onProfileClick: () => void;
}

export function Header({ onProfileClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-3 sm:p-4 bg-background border-b border-border">
      <div className="flex items-center gap-2 sm:gap-3">
        <h1 className="text-lg sm:text-2xl">FitTracker</h1>
      </div>
      
      <Avatar className="w-8 h-8 sm:w-9 sm:h-9 cursor-pointer" onClick={onProfileClick}>
        <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
        <AvatarFallback className="dark-theme:bg-white/20">
          <User className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
    </header>
  );
}