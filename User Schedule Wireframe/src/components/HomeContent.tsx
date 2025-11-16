import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Flame, Droplet, Target, Activity, TrendingUp, TrendingDown, ChevronDown, ChevronUp, Calendar } from 'lucide-react';

const dailyStats = {
  caloriesBurned: 420,
  caloriesGoal: 600,
  waterIntake: 6,
  waterGoal: 8,
  workoutsCompleted: 1,
  workoutsGoal: 2,
  steps: 8420,
  stepsGoal: 10000
};

const yesterdayStats = {
  caloriesBurned: 380,
  caloriesGoal: 600,
  waterIntake: 5,
  waterGoal: 8,
  workoutsCompleted: 2,
  workoutsGoal: 2,
  steps: 7250,
  stepsGoal: 10000
};

const activityGroups = [
  {
    period: 'Early Morning',
    timeRange: '7:00 AM - 8:30 AM',
    activities: [
      { id: '1', activity: 'Morning Cardio', duration: '30 min', calories: 250, time: '7:00 AM' },
      { id: '2', activity: 'Protein Breakfast', calories: 420, time: '8:30 AM' }
    ]
  },
  {
    period: 'Mid Morning',
    timeRange: '10:15 AM - 12:30 PM',
    activities: [
      { id: '3', activity: 'Water Break', calories: 0, time: '10:15 AM' },
      { id: '4', activity: 'Light Lunch', calories: 380, time: '12:30 PM' }
    ]
  },
  {
    period: 'Afternoon',
    timeRange: '2:00 PM - 3:45 PM',
    activities: [
      { id: '5', activity: 'Afternoon Walk', duration: '15 min', calories: 80, time: '2:00 PM' },
      { id: '6', activity: 'Snack', calories: 150, time: '3:45 PM' }
    ]
  },
  {
    period: 'Evening',
    timeRange: '5:30 PM - 7:00 PM',
    activities: [
      { id: '7', activity: 'Yoga Session', duration: '20 min', calories: 90, time: '5:30 PM' },
      { id: '8', activity: 'Dinner', calories: 520, time: '7:00 PM' }
    ]
  },
  {
    period: 'Night',
    timeRange: '8:30 PM - 9:15 PM',
    activities: [
      { id: '9', activity: 'Evening Stretch', duration: '10 min', calories: 35, time: '8:30 PM' },
      { id: '10', activity: 'Hydration Check', calories: 0, time: '9:15 PM' }
    ]
  }
];

export function HomeContent() {
  const [showComparison, setShowComparison] = useState(true);
  
  const calorieProgress = (dailyStats.caloriesBurned / dailyStats.caloriesGoal) * 100;
  const waterProgress = (dailyStats.waterIntake / dailyStats.waterGoal) * 100;
  const stepsProgress = (dailyStats.steps / dailyStats.stepsGoal) * 100;
  const workoutProgress = (dailyStats.workoutsCompleted / dailyStats.workoutsGoal) * 100;

  // Calculate differences
  const caloriesDiff = dailyStats.caloriesBurned - yesterdayStats.caloriesBurned;
  const waterDiff = dailyStats.waterIntake - yesterdayStats.waterIntake;
  const stepsDiff = dailyStats.steps - yesterdayStats.steps;
  const workoutsDiff = dailyStats.workoutsCompleted - yesterdayStats.workoutsCompleted;

  const ComparisonRow = ({ 
    icon, 
    label, 
    today, 
    yesterday, 
    diff, 
    unit = '',
    color 
  }: { 
    icon: React.ReactNode; 
    label: string; 
    today: number; 
    yesterday: number; 
    diff: number; 
    unit?: string;
    color: string;
  }) => (
    <div className="p-2 sm:p-3 rounded-lg bg-muted/30 border border-black/20">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className={`${color} flex-shrink-0`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm mb-1">{label}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground whitespace-nowrap">Yesterday:</span>
                <span className="text-xs sm:text-sm">{yesterday.toLocaleString()}{unit}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground whitespace-nowrap">Today:</span>
                <span className="text-xs sm:text-sm">{today.toLocaleString()}{unit}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
          {diff > 0 ? (
            <>
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
              <span className="text-xs sm:text-sm text-black whitespace-nowrap">+{diff.toLocaleString()}</span>
            </>
          ) : diff < 0 ? (
            <>
              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
              <span className="text-xs sm:text-sm text-red-600 whitespace-nowrap">{diff.toLocaleString()}</span>
            </>
          ) : (
            <span className="text-xs sm:text-sm text-muted-foreground">—</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto relative">
      {/* Decorative Background Elements for Home */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 blur-sm">
        {/* Fruits in top left with cartoon effect - animated */}
        <motion.div 
          className="absolute -top-10 -left-10 w-56 h-56 sm:w-64 sm:h-64 opacity-80"
          initial={{ x: 60, y: 40, scale: 0.3 }}
          animate={{ x: 0, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2,
            repeat: 0
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-lg">
            {/* Apple */}
            <motion.g
              initial={{ x: 50, y: 50 }}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <circle cx="60" cy="70" r="35" fill="#ef4444" stroke="#b91c1c" strokeWidth="3" opacity="0.9"/>
              <path d="M 60 35 Q 55 25 50 30" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <ellipse cx="55" cy="65" rx="10" ry="15" fill="#fca5a5" opacity="0.5"/>
            </motion.g>
            
            {/* Orange */}
            <motion.g
              initial={{ x: 50, y: 50 }}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              <circle cx="130" cy="60" r="30" fill="#f97316" stroke="#c2410c" strokeWidth="3" opacity="0.9"/>
              <circle cx="130" cy="55" r="3" fill="#65a30d" opacity="0.9"/>
              <ellipse cx="120" cy="55" rx="8" ry="12" fill="#fed7aa" opacity="0.5"/>
            </motion.g>
            
            {/* Banana */}
            <motion.g
              initial={{ x: 50, y: 50 }}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            >
              <path d="M 40 130 Q 60 120 80 125 Q 90 130 85 140 Q 70 145 50 140 Q 35 135 40 130" 
                    fill="#fbbf24" stroke="#d97706" strokeWidth="3" opacity="0.9"/>
              <path d="M 45 132 Q 65 127 75 130" stroke="#fef3c7" strokeWidth="2" fill="none" opacity="0.6"/>
            </motion.g>
            
            {/* Grape cluster */}
            <motion.g
              initial={{ x: 50, y: 50 }}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            >
              <circle cx="150" cy="130" r="12" fill="#7c3aed" stroke="#5b21b6" strokeWidth="2" opacity="0.9"/>
              <circle cx="165" cy="125" r="12" fill="#7c3aed" stroke="#5b21b6" strokeWidth="2" opacity="0.9"/>
              <circle cx="155" cy="145" r="12" fill="#7c3aed" stroke="#5b21b6" strokeWidth="2" opacity="0.9"/>
              <circle cx="170" cy="140" r="12" fill="#7c3aed" stroke="#5b21b6" strokeWidth="2" opacity="0.9"/>
            </motion.g>
          </svg>
        </motion.div>
        
        {/* Weights in bottom right with cartoon effect - animated */}
        <motion.div 
          className="absolute -bottom-10 -right-10 w-56 h-56 sm:w-64 sm:h-64 opacity-70"
          initial={{ x: -60, y: -40, scale: 0.3 }}
          animate={{ x: 0, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2,
            repeat: 0
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-lg">
            {/* Dumbbell */}
            <motion.g
              initial={{ x: -50, y: -50 }}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <rect x="70" y="90" width="60" height="15" rx="3" fill="#374151" stroke="#1f2937" strokeWidth="3"/>
              <rect x="50" y="75" width="25" height="45" rx="5" fill="#6b7280" stroke="#374151" strokeWidth="3"/>
              <rect x="125" y="75" width="25" height="45" rx="5" fill="#6b7280" stroke="#374151" strokeWidth="3"/>
              <ellipse cx="62.5" cy="97.5" rx="8" ry="15" fill="#9ca3af" opacity="0.6"/>
              <ellipse cx="137.5" cy="97.5" rx="8" ry="15" fill="#9ca3af" opacity="0.6"/>
            </motion.g>
            
            {/* Weight plate */}
            <motion.g
              initial={{ x: -50, y: -50 }}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              <circle cx="100" cy="160" r="35" fill="#4b5563" stroke="#1f2937" strokeWidth="4"/>
              <circle cx="100" cy="160" r="25" fill="#374151" stroke="#1f2937" strokeWidth="2"/>
              <circle cx="100" cy="160" r="8" fill="#1f2937"/>
              <path d="M 85 160 L 115 160 M 100 145 L 100 175" stroke="#6b7280" strokeWidth="2"/>
            </motion.g>
            
            {/* Kettlebell */}
            <motion.g
              initial={{ x: -50, y: -50 }}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            >
              <ellipse cx="50" cy="50" rx="20" ry="18" fill="#374151" stroke="#1f2937" strokeWidth="3"/>
              <rect x="45" y="30" width="10" height="15" rx="5" fill="#4b5563" stroke="#1f2937" strokeWidth="2"/>
              <ellipse cx="50" cy="45" rx="10" ry="8" fill="#6b7280" opacity="0.5"/>
            </motion.g>
          </svg>
        </motion.div>
      </div>
      
      <div className="space-y-1 sm:space-y-2 relative z-10">
        <h2 className="text-lg sm:text-xl">Good Morning, Alex!</h2>
        <p className="text-sm text-muted-foreground">Let's reach your goals today</p>
      </div>

      {/* Yesterday vs Today Comparison */}
      <Card className="relative z-10">
        <CardHeader className="pb-2 sm:pb-3">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="flex items-center justify-between w-full"
          >
            <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Yesterday vs Today
            </CardTitle>
            {showComparison ? (
              <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>
        </CardHeader>
        {showComparison && (
          <CardContent className="space-y-1.5 sm:space-y-2">
            <ComparisonRow
              icon={<Flame className="w-4 h-4" />}
              label="Calories Burned"
              today={dailyStats.caloriesBurned}
              yesterday={yesterdayStats.caloriesBurned}
              diff={caloriesDiff}
              color="text-orange-500"
            />
            <ComparisonRow
              icon={<Droplet className="w-4 h-4" />}
              label="Water Intake"
              today={dailyStats.waterIntake}
              yesterday={yesterdayStats.waterIntake}
              diff={waterDiff}
              unit=" cups"
              color="text-blue-500"
            />
            <ComparisonRow
              icon={<Activity className="w-4 h-4" />}
              label="Steps"
              today={dailyStats.steps}
              yesterday={yesterdayStats.steps}
              diff={stepsDiff}
              color="text-green-500"
            />
            <ComparisonRow
              icon={<Target className="w-4 h-4" />}
              label="Workouts"
              today={dailyStats.workoutsCompleted}
              yesterday={yesterdayStats.workoutsCompleted}
              diff={workoutsDiff}
              color="text-purple-500"
            />
          </CardContent>
        )}
      </Card>

      {/* Today's Goals */}
      <div className="space-y-2 relative z-10">
        <h3>Today's Goals</h3>
      </div>

      {/* Daily Progress Cards */}
      <div className="grid grid-cols-2 gap-3 relative z-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              Calories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-end gap-1">
              <span className="text-2xl font-semibold">{dailyStats.caloriesBurned}</span>
              <span className="text-muted-foreground">/{dailyStats.caloriesGoal}</span>
            </div>
            <Progress value={calorieProgress} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Droplet className="w-4 h-4 text-blue-500" />
              Water
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-end gap-1">
              <span className="text-2xl font-semibold">{dailyStats.waterIntake}</span>
              <span className="text-muted-foreground">/{dailyStats.waterGoal} cups</span>
            </div>
            <Progress value={waterProgress} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-500" />
              Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-end gap-1">
              <span className="text-2xl font-semibold">{dailyStats.steps.toLocaleString()}</span>
            </div>
            <Progress value={stepsProgress} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-500" />
              Workouts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-end gap-1">
              <span className="text-2xl font-semibold">{dailyStats.workoutsCompleted}</span>
              <span className="text-muted-foreground">/{dailyStats.workoutsGoal}</span>
            </div>
            <Progress value={workoutProgress} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Recent 10 Activities */}
      <Card className="relative z-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Recent 10 Activities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activityGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm">{group.period}</h4>
                <span className="text-xs text-muted-foreground">{group.timeRange}</span>
              </div>
              <div className="space-y-2">
                {group.activities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50 border border-black/20">
                    <div className="space-y-1">
                      <p className="text-sm">{activity.activity}</p>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <span>{activity.time}</span>
                        {activity.duration && (
                          <>
                            <span>•</span>
                            <span>{activity.duration}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.calories} cal
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}