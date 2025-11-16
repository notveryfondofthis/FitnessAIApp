import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { HomeContent } from './components/HomeContent';
import { ScheduleContent } from './components/ScheduleContent';
import { CameraContent } from './components/CameraContent';
import { BottomNavigation } from './components/BottomNavigation';
import { ProfileSheet } from './components/ProfileSheet';
import { AIAssistantFullscreen } from './components/AIAssistantFullscreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SubscriptionScreen } from './components/SubscriptionScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { PaymentSuccessScreen } from './components/PaymentSuccessScreen';
import { ForgotPasswordEmail } from './components/ForgotPasswordEmail';
import { ForgotPasswordVerify } from './components/ForgotPasswordVerify';
import { ChangePassword } from './components/ChangePassword';
import { SubscriptionManagement } from './components/SubscriptionManagement';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showVerifyCode, setShowVerifyCode] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showSubscriptionManagement, setShowSubscriptionManagement] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [theme, setTheme] = useState<'default' | 'dark'>('default');
  const [selectedPlan, setSelectedPlan] = useState<{
    id: string;
    name: string;
    price: string;
    period: string;
  } | null>(null);
  const [currentUserPlan, setCurrentUserPlan] = useState<{
    id: string;
    name: string;
    price: string;
    period: string;
  }>({
    id: 'premium',
    name: 'Premium',
    price: '$19.99',
    period: '/month'
  });
  const [activeTab, setActiveTab] = useState('home');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState<string | null>(null);
  const previousTab = useRef('home');

  const tabs = ['home', 'planner', 'food-scanner'];
  
  const getTabIndex = (tab: string) => tabs.indexOf(tab);
  
  const getAnimationDirection = () => {
    const currentIndex = getTabIndex(activeTab);
    const previousIndex = getTabIndex(previousTab.current);
    return currentIndex > previousIndex ? 1 : -1;
  };

  const handleTabChange = (newTab: string) => {
    previousTab.current = activeTab;
    setActiveTab(newTab);
  };

  const handleAiQuery = (query: string) => {
    setAiQuery(query);
  };

  const handleCloseAiAssistant = () => {
    setAiQuery(null);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowSubscription(false);
  };

  const handleSignup = () => {
    setShowSubscription(true);
  };

  const handleBackToWelcome = () => {
    setShowSubscription(false);
  };

  const handleSelectPlan = (planId: 'trial' | 'basic' | 'premium' | 'elite') => {
    // Map plan ID to plan details
    const planDetails = {
      trial: { id: 'trial', name: 'Free Trial', price: '$19.99', period: '/month' },
      basic: { id: 'basic', name: 'Basic', price: '$9.99', period: '/month' },
      premium: { id: 'premium', name: 'Premium', price: '$19.99', period: '/month' },
      elite: { id: 'elite', name: 'Elite', price: '$29.99', period: '/month' }
    };
    
    setSelectedPlan(planDetails[planId]);
    setShowPayment(true);
  };

  const handleBackToSubscription = () => {
    setShowPayment(false);
    setSelectedPlan(null);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    setShowPaymentSuccess(true);
  };

  const handlePaymentSuccessComplete = () => {
    setIsAuthenticated(true);
    setShowSubscription(false);
    setShowPaymentSuccess(false);
    // Update current user plan based on selected plan
    if (selectedPlan) {
      setCurrentUserPlan(selectedPlan);
    }
    setSelectedPlan(null);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToWelcomeFromForgotPassword = () => {
    setShowForgotPassword(false);
    setShowVerifyCode(false);
    setShowChangePassword(false);
    setResetEmail('');
  };

  const handleSendVerificationCode = (email: string) => {
    setResetEmail(email);
    setShowVerifyCode(true);
  };

  const handleBackToEmail = () => {
    setShowVerifyCode(false);
  };

  const handleVerifySuccess = () => {
    // After successful verification, show change password screen
    setShowChangePassword(true);
  };

  const handleBackToVerify = () => {
    setShowChangePassword(false);
  };

  const handlePasswordChangeComplete = () => {
    // After successful password change, go back to initial screen
    setIsAuthenticated(false);
    setShowForgotPassword(false);
    setShowVerifyCode(false);
    setShowChangePassword(false);
    setResetEmail('');
  };

  const handleManageSubscription = () => {
    setShowSubscriptionManagement(true);
  };

  const handleBackToApp = () => {
    setShowSubscriptionManagement(false);
  };

  const handleUpgradePlan = (planId: 'basic' | 'premium' | 'elite') => {
    const planDetails = {
      basic: { id: 'basic', name: 'Basic', price: '$9.99', period: '/month' },
      premium: { id: 'premium', name: 'Premium', price: '$19.99', period: '/month' },
      elite: { id: 'elite', name: 'Elite', price: '$29.99', period: '/month' }
    };
    
    setSelectedPlan(planDetails[planId]);
    setShowPayment(true);
  };

  const handleCancelSubscription = () => {
    // In real app, this would handle cancellation
    alert('Subscription cancelled. You\'ll have access until February 13, 2025.');
    setShowSubscriptionManagement(false);
  };

  // Show change password screen
  if (showChangePassword && resetEmail) {
    return (
      <ChangePassword
        email={resetEmail}
        onBack={handleBackToVerify}
        onComplete={handlePasswordChangeComplete}
      />
    );
  }

  // Show verification code screen
  if (showVerifyCode && resetEmail) {
    return (
      <ForgotPasswordVerify
        email={resetEmail}
        onBack={handleBackToEmail}
        onVerify={handleVerifySuccess}
      />
    );
  }

  // Show forgot password email screen
  if (showForgotPassword) {
    return (
      <ForgotPasswordEmail
        onBack={handleBackToWelcomeFromForgotPassword}
        onSendCode={handleSendVerificationCode}
      />
    );
  }

  // Show subscription management screen
  if (showSubscriptionManagement && isAuthenticated) {
    return (
      <SubscriptionManagement
        currentPlan={currentUserPlan}
        onBack={handleBackToApp}
        onUpgrade={handleUpgradePlan}
        onCancel={handleCancelSubscription}
      />
    );
  }

  // Show payment success screen
  if (showPaymentSuccess && selectedPlan) {
    return (
      <PaymentSuccessScreen
        planName={selectedPlan.name}
        onComplete={handlePaymentSuccessComplete}
      />
    );
  }

  // Show payment screen if a plan was selected
  if (showPayment && selectedPlan) {
    return (
      <PaymentScreen
        plan={selectedPlan}
        onBack={showSubscriptionManagement ? handleBackToApp : handleBackToSubscription}
        onComplete={handlePaymentComplete}
      />
    );
  }

  // Show subscription screen if user clicked sign up
  if (showSubscription) {
    return (
      <SubscriptionScreen 
        onBack={handleBackToWelcome}
        onSelectPlan={handleSelectPlan}
      />
    );
  }

  // Show welcome screen if not authenticated
  if (!isAuthenticated) {
    return (
      <WelcomeScreen 
        onLogin={handleLogin}
        onSignup={handleSignup}
        onForgotPassword={handleForgotPassword}
      />
    );
  }

  const renderContent = () => {
    const direction = getAnimationDirection();
    
    const slideVariants = {
      enter: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0
      }),
      center: {
        x: 0,
        opacity: 1
      },
      exit: (direction: number) => ({
        x: direction > 0 ? '-100%' : '100%',
        opacity: 0
      })
    };

    const transition = {
      type: "tween",
      ease: "easeInOut",
      duration: 0.3
    };

    switch (activeTab) {
      case 'home':
        return (
          <motion.div
            key="home"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0 overflow-y-auto"
          >
            <HomeContent />
          </motion.div>
        );
      case 'planner':
        return (
          <motion.div
            key="planner"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0 overflow-y-auto"
          >
            <ScheduleContent onAiQuery={handleAiQuery} />
          </motion.div>
        );
      case 'food-scanner':
        return (
          <motion.div
            key="food-scanner"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0 overflow-y-auto"
          >
            <CameraContent />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="home"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0 overflow-y-auto"
          >
            <HomeContent />
          </motion.div>
        );
    }
  };

  return (
    <div className={`h-screen flex flex-col max-w-md mx-auto relative ${theme === 'dark' ? 'dark-theme' : ''}`} style={{ background: theme === 'dark' ? '#000000' : 'var(--background)' }}>
      {/* AI Assistant Fullscreen */}
      <AnimatePresence>
        {aiQuery && (
          <AIAssistantFullscreen 
            query={aiQuery} 
            onClose={handleCloseAiAssistant} 
          />
        )}
      </AnimatePresence>

      {/* Main App */}
      {!aiQuery && (
        <>
          <div className="relative z-10">
            <Header onProfileClick={() => setIsProfileOpen(true)} />
          </div>
          <div className="flex-1 relative overflow-hidden z-10">
            <AnimatePresence mode="wait" custom={getAnimationDirection()}>
              {renderContent()}
            </AnimatePresence>
          </div>
          <div className="relative z-10">
            <BottomNavigation 
              activeTab={activeTab} 
              onTabChange={handleTabChange} 
            />
          </div>
          <ProfileSheet 
            open={isProfileOpen} 
            onOpenChange={setIsProfileOpen}
            currentPlan={currentUserPlan}
            onManageSubscription={handleManageSubscription}
            theme={theme}
            onThemeChange={setTheme}
          />
        </>
      )}
    </div>
  );
}