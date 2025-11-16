import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Check, ArrowLeft, Sparkles, Zap, Crown } from 'lucide-react';

interface SubscriptionScreenProps {
  onBack: () => void;
  onSelectPlan: (plan: 'trial' | 'basic' | 'premium' | 'elite') => void;
}

export function SubscriptionScreen({ onBack, onSelectPlan }: SubscriptionScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

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

  return (
    <div 
      className="h-screen flex flex-col max-w-md mx-auto p-6 overflow-y-auto" 
      style={{ background: 'var(--background)' }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-black/10 border border-black/30 flex items-center justify-center hover:bg-black/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2>Choose Your Plan</h2>
            <p className="text-muted-foreground text-sm">Start your fitness journey today</p>
          </div>
        </div>

        {/* Free Trial Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-black/50 bg-white/20">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3>7-Day Free Trial</h3>
                  <p className="text-sm text-muted-foreground">
                    Try all premium features with no commitment
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-black" />
                  <span className="text-sm">Full feature access</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-black" />
                  <span className="text-sm">Cancel anytime</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-black" />
                  <span className="text-sm">AI assistance</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-black" />
                  <span className="text-sm">No payment needed</span>
                </div>
              </div>

              <Button 
                className="w-full"
                onClick={() => onSelectPlan('trial')}
              >
                Start Free Trial
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Divider */}
        <div className="text-center text-sm text-muted-foreground">
          or choose a subscription plan
        </div>

        {/* Subscription Plans */}
        <div className="space-y-4">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all ${
                    selectedPlan === plan.id 
                      ? 'border-2 border-black shadow-lg scale-[1.02]' 
                      : 'border border-black/30 hover:border-black/50'
                  } ${plan.badge ? 'border-2 border-black/60' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full ${plan.color} border border-black/20 flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 ${plan.iconColor}`} />
                        </div>
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {plan.name}
                            {plan.badge && (
                              <Badge className="bg-black text-white border-black">
                                {plan.badge}
                              </Badge>
                            )}
                          </CardTitle>
                          <div className="flex items-baseline gap-1 mt-1">
                            <span className="text-2xl">{plan.price}</span>
                            <span className="text-sm text-muted-foreground">{plan.period}</span>
                          </div>
                        </div>
                      </div>
                      {selectedPlan === plan.id && (
                        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-0.5 text-black flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Continue Button */}
        {selectedPlan && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <Button 
              className="w-full"
              size="lg"
              onClick={() => onSelectPlan(selectedPlan as any)}
            >
              Continue with {plans.find(p => p.id === selectedPlan)?.name}
            </Button>
          </motion.div>
        )}

        {/* Footer */}
        <p className="text-xs text-center text-muted-foreground px-4 pb-4">
          All plans include a 30-day money-back guarantee. Cancel anytime.
        </p>
      </motion.div>
    </div>
  );
}
