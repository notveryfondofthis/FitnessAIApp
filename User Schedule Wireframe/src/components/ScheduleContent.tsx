import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Clock, MapPin, Dumbbell, Apple, Utensils, Search, Bot, Target, Trophy, Calendar } from 'lucide-react';

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  location?: string;
  type: 'workout' | 'meal' | 'supplement';
  duration?: string;
  calories?: number;
  isCompleted?: boolean;
  description?: string;
  details?: string[];
}

const mockScheduleData: ScheduleItem[] = [
  {
    id: '1',
    title: 'Morning Cardio',
    time: '7:00 AM',
    location: 'Gym',
    type: 'workout',
    duration: '30 min',
    calories: 250,
    description: 'Start your day with an energizing cardio session to boost metabolism and energy levels.',
    details: [
      'Treadmill running - 15 minutes at moderate pace',
      'Elliptical machine - 10 minutes intervals',
      'Cool down stretching - 5 minutes'
    ]
  },
  {
    id: '2',
    title: 'Protein Breakfast',
    time: '8:30 AM',
    type: 'meal',
    calories: 420,
    isCompleted: true,
    description: 'High-protein breakfast to fuel your morning and support muscle recovery.',
    details: [
      '3 scrambled eggs with spinach and mushrooms',
      '2 slices of whole grain toast with avocado',
      '1 cup of Greek yogurt with mixed berries',
      'Green tea or coffee'
    ]
  },
  {
    id: '3',
    title: 'Pre-workout Supplement',
    time: '5:30 PM',
    type: 'supplement',
    description: 'Take your pre-workout supplement 30 minutes before training for optimal energy and focus.',
    details: [
      'Creatine monohydrate - 5g',
      'Beta-alanine - 3g',
      'Caffeine - 200mg',
      'Mix with 16oz water'
    ]
  },
  {
    id: '4',
    title: 'Strength Training',
    time: '6:00 PM',
    location: 'Gym',
    type: 'workout',
    duration: '45 min',
    calories: 350,
    description: 'Upper body focused strength training session targeting chest, back, and shoulders.',
    details: [
      'Warm-up: 5 minutes light cardio',
      'Bench Press - 4 sets x 8-10 reps',
      'Pull-ups - 3 sets x 8-12 reps',
      'Shoulder Press - 3 sets x 10-12 reps',
      'Dumbbell Rows - 3 sets x 10-12 reps',
      'Bicep Curls & Tricep Extensions - 3 sets each'
    ]
  },
  {
    id: '5',
    title: 'Post-workout Meal',
    time: '7:30 PM',
    type: 'meal',
    calories: 380,
    description: 'Balanced post-workout dinner to replenish energy and support muscle recovery.',
    details: [
      'Grilled chicken breast - 6oz',
      'Quinoa - 1 cup',
      'Roasted vegetables (broccoli, carrots, bell peppers)',
      'Side salad with olive oil dressing',
      'Water or herbal tea'
    ]
  }
];

const mockGoalData = [
  {
    id: '1',
    title: 'Weight Loss Goal',
    current: 75,
    target: 70,
    unit: 'kg',
    progress: 60,
    deadline: '2 months left',
    icon: <Target className="w-4 h-4" />
  },
  {
    id: '2',
    title: 'Weekly Workouts',
    current: 3,
    target: 5,
    unit: 'sessions',
    progress: 60,
    deadline: 'This week',
    icon: <Dumbbell className="w-4 h-4" />
  },
  {
    id: '3',
    title: 'Daily Calories',
    current: 1650,
    target: 1800,
    unit: 'kcal',
    progress: 92,
    deadline: 'Today',
    icon: <Apple className="w-4 h-4" />
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'workout':
      return <Dumbbell className="w-4 h-4" />;
    case 'meal':
      return <Utensils className="w-4 h-4" />;
    case 'supplement':
      return <Apple className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

interface ScheduleContentProps {
  onAiQuery?: (query: string) => void;
}

export function ScheduleContent({ onAiQuery }: ScheduleContentProps) {
  const [aiQuery, setAiQuery] = useState('');
  
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleAiSearch = () => {
    if (aiQuery.trim() && onAiQuery) {
      onAiQuery(aiQuery);
      setAiQuery('');
    }
  };

  return (
    <div className="h-full p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto relative">
      {/* Decorative Background Elements for Planner */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 blur-sm">
        {/* Calendar in top left - with animated blobs */}
        <div className="absolute -top-10 -left-10 w-56 h-56 sm:w-64 sm:h-64 opacity-80">
          <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-lg">
            {/* Calendar background */}
            <rect x="40" y="50" width="120" height="130" rx="8" fill="#ffffff" stroke="#1f2937" strokeWidth="3"/>
            
            {/* Calendar header */}
            <rect x="40" y="50" width="120" height="30" rx="8" fill="#ef4444" stroke="#b91c1c" strokeWidth="3"/>
            <rect x="40" y="65" width="120" height="15" fill="#ef4444"/>
            
            {/* Binding rings */}
            <circle cx="65" cy="50" r="6" fill="#374151" stroke="#1f2937" strokeWidth="2"/>
            <circle cx="100" cy="50" r="6" fill="#374151" stroke="#1f2937" strokeWidth="2"/>
            <circle cx="135" cy="50" r="6" fill="#374151" stroke="#1f2937" strokeWidth="2"/>
            
            {/* Calendar grid */}
            <line x1="40" y1="95" x2="160" y2="95" stroke="#d1d5db" strokeWidth="2"/>
            <line x1="40" y1="115" x2="160" y2="115" stroke="#d1d5db" strokeWidth="2"/>
            <line x1="40" y1="135" x2="160" y2="135" stroke="#d1d5db" strokeWidth="2"/>
            <line x1="40" y1="155" x2="160" y2="155" stroke="#d1d5db" strokeWidth="2"/>
            
            <line x1="70" y1="80" x2="70" y2="180" stroke="#d1d5db" strokeWidth="2"/>
            <line x1="100" y1="80" x2="100" y2="180" stroke="#d1d5db" strokeWidth="2"/>
            <line x1="130" y1="80" x2="130" y2="180" stroke="#d1d5db" strokeWidth="2"/>
            
            {/* Date numbers - animated blobs */}
            <motion.circle 
              cx="55" cy="105" r="8" fill="#22c55e" opacity="0.9"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              transition={{ duration: 0.4, delay: 0.3, repeat: 0 }}
            />
            <motion.circle 
              cx="85" cy="125" r="8" fill="#3b82f6" opacity="0.9"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              transition={{ duration: 0.4, delay: 0.5, repeat: 0 }}
            />
            <motion.circle 
              cx="115" cy="145" r="8" fill="#f59e0b" opacity="0.9"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              transition={{ duration: 0.4, delay: 0.7, repeat: 0 }}
            />
            <motion.circle 
              cx="145" cy="165" r="8" fill="#8b5cf6" opacity="0.9"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.9 }}
              transition={{ duration: 0.4, delay: 0.9, repeat: 0 }}
            />
            
            {/* Decorative check mark */}
            <motion.path 
              d="M 140 100 L 145 105 L 155 92" 
              stroke="#22c55e" 
              strokeWidth="3" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 1.1, repeat: 0 }}
            />
          </svg>
        </div>
        
        {/* Robot in bottom right - with animated arms */}
        <div className="absolute -bottom-10 -right-10 w-56 h-56 sm:w-64 sm:h-64 opacity-70">
          <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-lg">
            {/* Robot head */}
            <rect x="70" y="45" width="60" height="55" rx="8" fill="#60a5fa" stroke="#1e40af" strokeWidth="3"/>
            <circle cx="85" cy="65" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2"/>
            <circle cx="115" cy="65" r="8" fill="#ffffff" stroke="#1e40af" strokeWidth="2"/>
            <circle cx="85" cy="65" r="4" fill="#1e40af"/>
            <circle cx="115" cy="65" r="4" fill="#1e40af"/>
            
            {/* Robot antenna */}
            <line x1="100" y1="45" x2="100" y2="30" stroke="#1e40af" strokeWidth="3" strokeLinecap="round"/>
            <motion.circle 
              cx="100" cy="28" r="5" fill="#ef4444" stroke="#b91c1c" strokeWidth="2"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 2,
                repeat: 0,
                ease: "easeInOut"
              }}
            />
            
            {/* Robot smile */}
            <path d="M 85 85 Q 100 92 115 85" stroke="#1e40af" strokeWidth="3" fill="none" strokeLinecap="round"/>
            
            {/* Robot body */}
            <rect x="65" y="105" width="70" height="65" rx="6" fill="#60a5fa" stroke="#1e40af" strokeWidth="3"/>
            
            {/* Control panel */}
            <rect x="75" y="115" width="50" height="35" rx="4" fill="#1e40af" opacity="0.3"/>
            <circle cx="90" cy="127" r="4" fill="#22c55e"/>
            <circle cx="110" cy="127" r="4" fill="#ef4444"/>
            <rect x="80" y="140" width="15" height="4" rx="2" fill="#60a5fa"/>
            <rect x="100" y="140" width="15" height="4" rx="2" fill="#60a5fa"/>
            
            {/* Robot arms - animated */}
            <motion.g
              animate={{ 
                rotate: [0, -15, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: 0,
                ease: "easeInOut",
                repeatDelay: 0.5
              }}
              style={{ originX: '52.5px', originY: '110px' }}
            >
              <rect x="45" y="110" width="15" height="40" rx="7" fill="#60a5fa" stroke="#1e40af" strokeWidth="2"/>
              <circle cx="52.5" cy="153" r="8" fill="#fbbf24" stroke="#d97706" strokeWidth="2"/>
            </motion.g>
            
            <motion.g
              animate={{ 
                rotate: [0, 15, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: 0,
                ease: "easeInOut",
                repeatDelay: 0.5
              }}
              style={{ originX: '147.5px', originY: '110px' }}
            >
              <rect x="140" y="110" width="15" height="40" rx="7" fill="#60a5fa" stroke="#1e40af" strokeWidth="2"/>
              <circle cx="147.5" cy="153" r="8" fill="#fbbf24" stroke="#d97706" strokeWidth="2"/>
            </motion.g>
            
            {/* Robot legs */}
            <rect x="75" y="172" width="18" height="20" rx="4" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2"/>
            <rect x="107" y="172" width="18" height="20" rx="4" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      
      <div className="space-y-1 sm:space-y-2 relative z-10">
        <h2 className="text-lg sm:text-xl">Planner</h2>
        <p className="text-muted-foreground">{today}</p>
      </div>

      {/* Ask AI Search Bar */}
      <Card className="relative z-10">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-primary" />
            Ask AI Assistant for workout sets or meal plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="E.g., Create a 5-day workout plan or Give me a meal plan..."
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAiSearch()}
              className="flex-1"
            />
            <Button onClick={handleAiSearch} size="sm">
              <Search className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge 
              variant="secondary" 
              className="text-xs cursor-pointer"
              onClick={() => {
                setAiQuery('Create a workout plan for upper body');
                setTimeout(() => handleAiSearch(), 100);
              }}
            >
              "Workout plan for upper body"
            </Badge>
            <Badge 
              variant="secondary" 
              className="text-xs cursor-pointer"
              onClick={() => {
                setAiQuery('Give me a high protein meal plan');
                setTimeout(() => handleAiSearch(), 100);
              }}
            >
              "High protein meal plan"
            </Badge>
            <Badge 
              variant="secondary" 
              className="text-xs cursor-pointer"
              onClick={() => {
                setAiQuery('Best cardio exercises for weight loss');
                setTimeout(() => handleAiSearch(), 100);
              }}
            >
              "Cardio for weight loss"
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Goal Tracker */}
      <Card className="relative z-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Goal Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockGoalData.map((goal) => (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {goal.icon}
                  <span>{goal.title}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span className="text-xs">{goal.deadline}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>{goal.current} / {goal.target} {goal.unit}</span>
                <span className="text-muted-foreground">{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <div className="space-y-3 relative z-10">
        <h3>Today's Activities</h3>
        {mockScheduleData.map((item) => (
          <Card key={item.id} className={`relative ${item.isCompleted ? 'bg-muted/50' : ''}`}>
            {item.isCompleted && (
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white">
                ✓ Done
              </Badge>
            )}
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className={`text-base flex items-center gap-2 ${item.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                  {getTypeIcon(item.type)}
                  {item.title}
                </CardTitle>
                <Badge variant="outline" className="ml-2">
                  {item.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{item.time}</span>
                {item.duration && (
                  <>
                    <span>•</span>
                    <span>{item.duration}</span>
                  </>
                )}
              </div>
              
              {item.location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
              )}
              
              {item.calories && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>🔥</span>
                  <span>{item.calories} calories</span>
                </div>
              )}

              {item.description && (
                <p className="text-sm text-muted-foreground pt-2 border-t border-black/20">
                  {item.description}
                </p>
              )}

              {item.details && item.details.length > 0 && (
                <div className="space-y-1 pt-2">
                  <p className="text-sm">Details:</p>
                  <ul className="space-y-1">
                    {item.details.map((detail, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-black mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}