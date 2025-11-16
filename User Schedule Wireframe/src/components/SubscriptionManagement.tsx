import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Check, AlertCircle, Sparkles, Zap, Crown } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface SubscriptionManagementProps {
  currentPlan: {
    id: string;
    name: string;
    price: string;
    period: string;
  };
  onBack: () => void;
  onUpgrade: (planId: 'basic' | 'premium' | 'elite') => void;
  onCancel: () => void;
}

export function SubscriptionManagement({ 
  currentPlan, 
  onBack, 
  onUpgrade,
  onCancel 
}: SubscriptionManagementProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$9.99',
      period: '/month',
      icon: Zap,
      color: 'bg-green-500/20',
      iconColor: 'text-green-600',
      features: [
        'Track workouts & meals',
        'Basic nutrition insights',
        'Progress tracking',
        'Food scanner access',
        'Mobile app access'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$19.99',
      period: '/month',
      icon: Crown,
      color: 'bg-blue-500/20',
      iconColor: 'text-blue-600',
      badge: 'Most Popular',
      features: [
        'Everything in Basic',
        'AI workout planner',
        'AI meal planner',
        'Personalized recommendations',
        'Advanced analytics',
        'Priority support'
      ]
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '$29.99',
      period: '/month',
      icon: Sparkles,
      color: 'bg-purple-500/20',
      iconColor: 'text-purple-600',
      features: [
        'Everything in Premium',
        '1-on-1 virtual coaching',
        'Custom meal plans',
        'Weekly check-ins',
        'Unlimited AI queries',
        'Early access to features'
      ]
    }
  ];

  const handleCancelConfirm = () => {
    setShowCancelDialog(false);
    onCancel();
  };

  return (
    <div 
      className="h-screen flex flex-col max-w-md mx-auto p-3 sm:p-6 overflow-y-auto" 
      style={{ background: 'var(--background)' }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-4 sm:space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onBack}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/10 border border-black/30 flex items-center justify-center hover:bg-black/20 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl">Manage Subscription</h2>
            <p className="text-muted-foreground text-xs sm:text-sm">Change or cancel your plan</p>
          </div>
        </div>

        {/* Current Plan */}
        <Card className="border-2 border-black/50">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center justify-between text-sm sm:text-base">
              <span>Current Plan</span>
              <Badge className="bg-green-500/20 text-black border-black/30 text-xs">
                Active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-base sm:text-lg">{currentPlan.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Next billing: February 13, 2025
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xl sm:text-2xl">{currentPlan.price}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{currentPlan.period}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Options */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg">Upgrade Your Plan</h3>
          
          {plans
            .filter(plan => {
              // Show plans that are higher tier than current
              const planOrder = { basic: 1, premium: 2, elite: 3 };
              const currentOrder = planOrder[currentPlan.id.toLowerCase() as keyof typeof planOrder] || 0;
              const planTier = planOrder[plan.id as keyof typeof planOrder];
              return planTier > currentOrder;
            })
            .map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Card className="border border-black/30 hover:border-black/50 transition-all">
                    <CardHeader className="pb-2 sm:pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${plan.color} border border-black/20 flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${plan.iconColor}`} />
                          </div>
                          <div className="min-w-0">
                            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                              <span>{plan.name}</span>
                              {plan.badge && (
                                <Badge className="bg-black text-white border-black text-xs whitespace-nowrap">
                                  {plan.badge}
                                </Badge>
                              )}
                            </CardTitle>
                            <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1">
                              <span className="text-lg sm:text-2xl">{plan.price}</span>
                              <span className="text-xs sm:text-sm text-muted-foreground">{plan.period}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 sm:space-y-3 pt-0">
                      <div className="space-y-1.5 sm:space-y-2">
                        {plan.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-black flex-shrink-0" />
                            <span className="text-xs sm:text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button 
                        className="w-full text-xs sm:text-sm"
                        onClick={() => onUpgrade(plan.id as 'basic' | 'premium' | 'elite')}
                      >
                        Upgrade to {plan.name}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
        </div>

        {/* Cancel Subscription */}
        <Card className="border border-destructive/50 bg-destructive/5">
          <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
                <p className="text-sm sm:text-base">Cancel Subscription</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  You'll continue to have access until the end of your current billing period.
                </p>
              </div>
            </div>
            <Button 
              variant="destructive"
              className="w-full text-xs sm:text-sm"
              onClick={() => setShowCancelDialog(true)}
            >
              Cancel Subscription
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel your {currentPlan.name} subscription. You'll continue to have access 
              until February 13, 2025, and won't be charged again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelConfirm}>
              Yes, Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
