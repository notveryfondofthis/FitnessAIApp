import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Mail, Send } from 'lucide-react';

interface ForgotPasswordEmailProps {
  onBack: () => void;
  onSendCode: (email: string) => void;
}

export function ForgotPasswordEmail({ onBack, onSendCode }: ForgotPasswordEmailProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending verification code
    setTimeout(() => {
      setIsSubmitting(false);
      onSendCode(email);
    }, 1000);
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
            <h2>Forgot Password</h2>
            <p className="text-muted-foreground text-sm">We'll send you a verification code</p>
          </div>
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Reset Your Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-black/10 border-2 border-black/30 flex items-center justify-center">
                <Mail className="w-8 h-8 text-black" />
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Enter your email address and we'll send you a verification code to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Verification Code
                  </>
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Remember your password? </span>
              <button
                type="button"
                onClick={onBack}
                className="hover:underline"
              >
                Sign in
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Info Notice */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-black/10 border border-black/30">
          <Mail className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm">
              If an account exists with this email, you'll receive a verification code within a few minutes.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
