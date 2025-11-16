import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { X, Bot, Send, Sparkles, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantFullscreenProps {
  query: string;
  onClose: () => void;
}

export function AIAssistantFullscreen({ query, onClose }: AIAssistantFullscreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'user',
      content: query,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial AI response
  useEffect(() => {
    const timer = setTimeout(() => {
      simulateAIResponse(query);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const generateMockResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('workout') || lowerQuery.includes('sets')) {
      return `I'd be happy to help you with a workout plan! Here's a comprehensive upper body routine:

**Upper Body Workout:**
• Bench Press: 4 sets × 8-10 reps
• Pull-ups: 3 sets × 8-12 reps
• Shoulder Press: 3 sets × 10-12 reps
• Dumbbell Rows: 3 sets × 10-12 reps
• Bicep Curls: 3 sets × 12-15 reps
• Tricep Dips: 3 sets × 10-12 reps

Rest 60-90 seconds between sets. Remember to warm up for 5-10 minutes and cool down with stretching.

Would you like me to create a full week workout split?`;
    } else if (lowerQuery.includes('meal') || lowerQuery.includes('nutrition') || lowerQuery.includes('diet')) {
      return `Here's a balanced daily meal plan for you:

**Breakfast (7:30 AM) - 450 cal**
• 3 scrambled eggs with spinach
• 2 slices whole grain toast
• 1 medium banana
• Green tea

**Lunch (1:00 PM) - 550 cal**
• Grilled chicken breast (6 oz)
• Quinoa (1 cup)
• Mixed vegetables
• Olive oil dressing

**Dinner (7:30 PM) - 500 cal**
• Baked salmon (6 oz)
• Sweet potato
• Steamed broccoli

**Snacks**
• Greek yogurt with berries (200 cal)
• Protein shake with apple (150 cal)

Total: ~1,850 calories | Protein: 145g | Carbs: 185g | Fats: 55g

Would you like me to adjust this based on your specific goals?`;
    } else {
      return `I'm here to help with your fitness journey! Based on your question, here are some key recommendations:

**Fitness Fundamentals:**
1. Consistency is crucial - aim for 3-4 sessions per week
2. Focus on progressive overload in your training
3. Get 7-9 hours of quality sleep
4. Stay hydrated with at least 8 cups of water daily
5. Track your progress to stay accountable

**Next Steps:**
• Set specific, measurable goals
• Create a structured schedule
• Plan your nutrition in advance

What specific aspect would you like to focus on - workouts, nutrition, or recovery?`;
    }
  };

  const simulateAIResponse = (userQuery: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const response = generateMockResponse(userQuery);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    simulateAIResponse(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col max-w-md mx-auto"
      style={{ background: 'var(--background)' }}
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between p-3 sm:p-4 border-b border-black/30 bg-white/10 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black flex items-center justify-center">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg">AI Fitness Coach</h2>
            <p className="text-xs text-muted-foreground">Always here to help</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-9 w-9 p-0 rounded-full hover:bg-black/20"
        >
          <X className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 200,
                damping: 20
              }}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[75%] rounded-2xl p-3 sm:p-4 ${
                  message.role === 'user'
                    ? 'bg-black text-white rounded-br-sm'
                    : 'bg-white/20 border border-black/30 rounded-bl-sm'
                }`}
              >
                <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </div>
                <div className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-white/60' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {message.role === 'user' && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/20 border border-black/30 flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-2 sm:gap-3"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <div className="bg-white/20 border border-black/30 rounded-2xl rounded-bl-sm p-3 sm:p-4">
              <div className="flex gap-1">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 rounded-full bg-black/60"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-black/60"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  className="w-2 h-2 rounded-full bg-black/60"
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="border-t border-black/30 p-3 sm:p-4 bg-white/10 backdrop-blur-sm"
      >
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about fitness..."
            className="flex-1 bg-white/20 border-black/30"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          AI can make mistakes. Verify important information.
        </p>
      </motion.div>
    </motion.div>
  );
}
