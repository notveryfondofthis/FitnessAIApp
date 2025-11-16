import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { ArrowLeft, Shield, Check } from 'lucide-react';

interface ForgotPasswordVerifyProps {
  email: string;
  onBack: () => void;
  onVerify: () => void;
}

export function ForgotPasswordVerify({ email, onBack, onVerify }: ForgotPasswordVerifyProps) {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = () => {
    setError('');
    setIsVerifying(true);

    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      // Accept any 6-digit code for demo purposes
      if (code.length === 6) {
        onVerify();
      } else {
        setError('Please enter a valid 6-digit code');
      }
    }, 1000);
  };

  const handleResend = () => {
    setCode('');
    setError('');
    // In a real app, this would trigger another code send
    alert('Verification code resent!');
  };

  return (
    <div 
      className="h-screen flex flex-col max-w-md mx-auto p-6 justify-center" 
      style={{ background: 'var(--background)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-black/10 border border-black/30 flex items-center justify-center hover:bg-black/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2>Verify Code</h2>
            <p className="text-muted-foreground text-sm">Enter the code we sent you</p>
          </div>
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Enter Verification Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-black/10 border-2 border-black/30 flex items-center justify-center">
                <Shield className="w-8 h-8 text-black" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                We've sent a 6-digit verification code to
              </p>
              <p className="font-medium">{email}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={(value) => {
                    setCode(value);
                    setError('');
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
            </div>

            <Button 
              className="w-full" 
              onClick={handleVerify}
              disabled={code.length !== 6 || isVerifying}
            >
              {isVerifying ? (
                <>
                  <span className="animate-pulse">Verifying...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Verify & Reset Password
                </>
              )}
            </Button>

            <div className="text-center text-sm space-y-2">
              <p className="text-muted-foreground">Didn't receive the code?</p>
              <button
                type="button"
                onClick={handleResend}
                className="hover:underline"
              >
                Resend Code
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Info Notice */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-black/10 border border-black/30">
          <Shield className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm">
              For security purposes, this code will expire in 10 minutes.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
