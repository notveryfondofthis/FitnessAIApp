import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, Lock, Eye, EyeOff, Check } from 'lucide-react';

interface ChangePasswordProps {
  email: string;
  onBack: () => void;
  onComplete: () => void;
}

export function ChangePassword({ email, onBack, onComplete }: ChangePasswordProps) {
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [error, setError] = useState('');

  const handleChangePassword = () => {
    setError('');

    // Validation
    if (!newPassword || !retypePassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== retypePassword) {
      setError('Passwords do not match');
      return;
    }

    setIsChanging(true);

    // Simulate password change
    setTimeout(() => {
      setIsChanging(false);
      onComplete();
    }, 1500);
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
            <h2>Change Password</h2>
            <p className="text-muted-foreground text-sm">Create your new password</p>
          </div>
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Set New Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-black/10 border-2 border-black/30 flex items-center justify-center">
                <Lock className="w-8 h-8 text-black" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Setting new password for
              </p>
              <p className="font-medium">{email}</p>
            </div>

            <div className="space-y-4">
              {/* New Password Field */}
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setError('');
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {/* Retype Password Field */}
              <div className="space-y-2">
                <Label htmlFor="retype-password">Retype Password</Label>
                <div className="relative">
                  <Input
                    id="retype-password"
                    type={showRetypePassword ? 'text' : 'password'}
                    placeholder="Retype new password"
                    value={retypePassword}
                    onChange={(e) => {
                      setRetypePassword(e.target.value);
                      setError('');
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRetypePassword(!showRetypePassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showRetypePassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}
            </div>

            <Button 
              className="w-full" 
              onClick={handleChangePassword}
              disabled={!newPassword || !retypePassword || isChanging}
            >
              {isChanging ? (
                <>
                  <span className="animate-pulse">Changing Password...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Change Password
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Password Requirements */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-black/10 border border-black/30">
          <Lock className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm">
              Password must be at least 8 characters long and include a mix of letters, numbers, and special characters for security.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
