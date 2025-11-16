import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { User, Target, Scale, Ruler, Calendar, Trophy, CreditCard, ChevronRight, Palette } from 'lucide-react';

interface ProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan: {
    id: string;
    name: string;
    price: string;
    period: string;
  };
  onManageSubscription: () => void;
  theme: 'default' | 'dark';
  onThemeChange: (theme: 'default' | 'dark') => void;
}

const mockUserData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  weight: "75 kg",
  height: "175 cm",
  age: 28,
  joinDate: "January 2024",
  currentGoal: "Lose 5kg",
  weeklyGoal: "3 workouts",
  achievements: ["7-day streak", "First 5K", "Goal achieved"]
};

export function ProfileSheet({ open, onOpenChange, currentPlan, onManageSubscription, theme, onThemeChange }: ProfileSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className={`w-full sm:max-w-md overflow-y-auto ${theme === 'dark' ? 'dark-theme' : ''}`}>
        <SheetHeader className="space-y-4">
          <SheetTitle>Profile</SheetTitle>
          <SheetDescription>
            View and manage your personal fitness information
          </SheetDescription>
          
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
              <AvatarFallback>
                <User className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <div className="text-center space-y-1">
              <h3>{mockUserData.name}</h3>
              <p className="text-muted-foreground">{mockUserData.email}</p>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-4 pb-6">
          {/* Theme Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Theme
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={theme === 'default' ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => onThemeChange('default')}
                >
                  Default
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  className="w-full"
                  onClick={() => onThemeChange('dark')}
                >
                  Dark Mode
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{currentPlan.name} Plan</p>
                  <p className="text-sm text-muted-foreground">
                    {currentPlan.price}{currentPlan.period}
                  </p>
                </div>
                <Badge className="bg-green-500/20 text-black border-black/30">
                  Active
                </Badge>
              </div>
              <div className="pt-2">
                <p className="text-sm text-muted-foreground mb-2">
                  Next billing: February 13, 2025
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    onOpenChange(false);
                    onManageSubscription();
                  }}
                >
                  Manage Subscription
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Physical Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-4 h-4" />
                Physical Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Weight:</span>
                <span>{mockUserData.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Height:</span>
                <span>{mockUserData.height}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age:</span>
                <span>{mockUserData.age} years</span>
              </div>
            </CardContent>
          </Card>

          {/* Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Current Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Weight Goal:</span>
                <Badge variant="outline">{mockUserData.currentGoal}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Weekly Target:</span>
                <Badge variant="outline">{mockUserData.weeklyGoal}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockUserData.achievements.map((achievement, index) => (
                  <Badge key={index} className="bg-primary/10 text-primary border-primary/20">
                    {achievement}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Member Since */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Member since {mockUserData.joinDate}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}