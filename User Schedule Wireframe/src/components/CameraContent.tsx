import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Camera, Image, Clock, Zap } from 'lucide-react';

const recentScans = [
  {
    id: '1',
    type: 'Food',
    item: 'Chicken Salad',
    calories: 320,
    time: '2 hours ago',
    confidence: 95
  },
  {
    id: '2',
    type: 'Barcode',
    item: 'Protein Bar',
    calories: 180,
    time: '5 hours ago',
    confidence: 98
  },
  {
    id: '3',
    type: 'Food',
    item: 'Banana',
    calories: 105,
    time: '1 day ago',
    confidence: 87
  }
];

export function CameraContent() {
  const [isScanning, setIsScanning] = useState(false);

  return (
    <div className="h-full p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto relative">
      {/* Decorative Background Elements for Food Scanner */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 blur-sm">
        {/* Camera in top left - with animated shutter */}
        <div className="absolute -top-10 -left-10 w-56 h-56 sm:w-64 sm:h-64 opacity-80">
          <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-lg">
            {/* Camera body */}
            <rect x="50" y="70" width="100" height="80" rx="8" fill="#374151" stroke="#1f2937" strokeWidth="3"/>
            
            {/* Camera top section */}
            <rect x="70" y="55" width="60" height="20" rx="6" fill="#4b5563" stroke="#1f2937" strokeWidth="3"/>
            
            {/* Lens outer ring */}
            <circle cx="100" cy="110" r="30" fill="#1f2937" stroke="#111827" strokeWidth="3"/>
            <circle cx="100" cy="110" r="22" fill="#6366f1" stroke="#4338ca" strokeWidth="2" opacity="0.8"/>
            
            {/* Animated shutter blades - 6 segments that open and close */}
            <g>
              <defs>
                <clipPath id="shutter-clip">
                  <circle cx="100" cy="110" r="22" />
                </clipPath>
              </defs>
              <g clipPath="url(#shutter-clip)">
                {/* Shutter blade 1 */}
                <motion.path
                  d="M 100 110 L 122 110 L 122 88 L 100 88 Z"
                  fill="#1f2937"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: [1, 0.1, 1] }}
                  transition={{
                    duration: 3,
                    repeat: 0,
                    ease: "easeInOut",
                    times: [0, 0.5, 1]
                  }}
                  style={{ originX: '100px', originY: '110px' }}
                />
                {/* Shutter blade 2 */}
                <motion.path
                  d="M 100 110 L 122 110 L 122 132 L 100 132 Z"
                  fill="#1f2937"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: [1, 0.1, 1] }}
                  transition={{
                    duration: 3,
                    repeat: 0,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    delay: 0.1
                  }}
                  style={{ originX: '100px', originY: '110px' }}
                />
                {/* Shutter blade 3 */}
                <motion.path
                  d="M 100 110 L 78 110 L 78 132 L 100 132 Z"
                  fill="#1f2937"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: [1, 0.1, 1] }}
                  transition={{
                    duration: 3,
                    repeat: 0,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    delay: 0.2
                  }}
                  style={{ originX: '100px', originY: '110px' }}
                />
                {/* Shutter blade 4 */}
                <motion.path
                  d="M 100 110 L 78 110 L 78 88 L 100 88 Z"
                  fill="#1f2937"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: [1, 0.1, 1] }}
                  transition={{
                    duration: 3,
                    repeat: 0,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    delay: 0.3
                  }}
                  style={{ originX: '100px', originY: '110px' }}
                />
              </g>
            </g>
            
            {/* Center lens element */}
            <circle cx="100" cy="110" r="15" fill="#312e81" opacity="0.6"/>
            
            {/* Lens reflection */}
            <ellipse cx="90" cy="100" rx="10" ry="12" fill="#a5b4fc" opacity="0.4"/>
            
            {/* Flash - animated */}
            <motion.circle 
              cx="130" cy="85" r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="2"
              animate={{ 
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: 0,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />
            <motion.circle 
              cx="130" cy="85" r="3" fill="#fef3c7" opacity="0.8"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: 0,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            />
            
            {/* Viewfinder */}
            <rect x="65" y="80" width="12" height="8" rx="2" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1.5"/>
            
            {/* Camera details */}
            <rect x="85" y="135" width="30" height="8" rx="2" fill="#6b7280"/>
            <circle cx="120" cy="139" r="4" fill="#9ca3af"/>
            
            {/* Decorative focus lines - animated */}
            <motion.path 
              d="M 70 110 L 75 110" 
              stroke="#22c55e" 
              strokeWidth="2" 
              strokeLinecap="round"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: 0,
                ease: "easeInOut"
              }}
            />
            <motion.path 
              d="M 125 110 L 130 110" 
              stroke="#22c55e" 
              strokeWidth="2" 
              strokeLinecap="round"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: 0,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <motion.path 
              d="M 100 80 L 100 85" 
              stroke="#22c55e" 
              strokeWidth="2" 
              strokeLinecap="round"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: 0,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.path 
              d="M 100 135 L 100 140" 
              stroke="#22c55e" 
              strokeWidth="2" 
              strokeLinecap="round"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: 0,
                ease: "easeInOut",
                delay: 1.5
              }}
            />
          </svg>
        </div>
        
        {/* Barcode in bottom right - with animated scanning line */}
        <div className="absolute -bottom-10 -right-10 w-56 h-56 sm:w-64 sm:h-64 opacity-70">
          <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-lg">
            {/* Barcode background */}
            <rect x="50" y="80" width="100" height="70" rx="6" fill="#ffffff" stroke="#1f2937" strokeWidth="3"/>
            
            {/* Barcode lines - varying widths */}
            <rect x="55" y="90" width="3" height="40" fill="#000000"/>
            <rect x="60" y="90" width="2" height="40" fill="#000000"/>
            <rect x="64" y="90" width="4" height="40" fill="#000000"/>
            <rect x="70" y="90" width="2" height="40" fill="#000000"/>
            <rect x="74" y="90" width="3" height="40" fill="#000000"/>
            <rect x="79" y="90" width="5" height="40" fill="#000000"/>
            <rect x="86" y="90" width="2" height="40" fill="#000000"/>
            <rect x="90" y="90" width="4" height="40" fill="#000000"/>
            <rect x="96" y="90" width="2" height="40" fill="#000000"/>
            <rect x="100" y="90" width="3" height="40" fill="#000000"/>
            <rect x="105" y="90" width="5" height="40" fill="#000000"/>
            <rect x="112" y="90" width="2" height="40" fill="#000000"/>
            <rect x="116" y="90" width="4" height="40" fill="#000000"/>
            <rect x="122" y="90" width="3" height="40" fill="#000000"/>
            <rect x="127" y="90" width="2" height="40" fill="#000000"/>
            <rect x="131" y="90" width="5" height="40" fill="#000000"/>
            <rect x="138" y="90" width="3" height="40" fill="#000000"/>
            <rect x="143" y="90" width="2" height="40" fill="#000000"/>
            
            {/* Barcode number text (simulated with rectangles) */}
            <text x="100" y="142" textAnchor="middle" fontSize="14" fill="#000000" fontFamily="monospace" fontWeight="900">8 901234 567890</text>
            
            {/* Animated scanning laser line effect */}
            <motion.g
              animate={{ y: [0, 50, 0] }}
              transition={{
                duration: 2,
                repeat: 0,
                ease: "easeInOut"
              }}
            >
              <line x1="45" y1="90" x2="155" y2="90" stroke="#ef4444" strokeWidth="2" opacity="0.8"/>
              <rect x="45" y="88" width="110" height="4" fill="#ef4444" opacity="0.3"/>
              {/* Glow effect */}
              <line x1="45" y1="90" x2="155" y2="90" stroke="#fca5a5" strokeWidth="6" opacity="0.3"/>
            </motion.g>
            
            {/* Scanner corners */}
            <path d="M 45 75 L 45 85 M 45 75 L 55 75" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
            <path d="M 155 75 L 155 85 M 155 75 L 145 75" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
            <path d="M 45 145 L 45 135 M 45 145 L 55 145" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
            <path d="M 155 145 L 155 135 M 155 145 L 145 145" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      
      <div className="space-y-1 sm:space-y-2 relative z-10">
        <h2 className="text-lg sm:text-xl">Food Scanner</h2>
        <p className="text-muted-foreground">AI-powered scanner for food and barcodes</p>
      </div>

      {/* Unified Scanner */}
      <Card className="relative z-10">
        <CardContent className="p-6">
          <div className="aspect-square bg-muted rounded-lg flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-black/30">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Camera className="w-10 h-10 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <p>Smart Scanner</p>
              <p className="text-muted-foreground text-sm px-4">
                Automatically detects food items and barcodes
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full px-8">
              <Button 
                className="w-full"
                onClick={() => setIsScanning(!isScanning)}
              >
                <Camera className="w-4 h-4 mr-2" />
                {isScanning ? 'Stop Scanning' : 'Start Scanner'}
              </Button>
              <Button variant="outline" className="w-full">
                <Image className="w-4 h-4 mr-2" />
                Upload from Gallery
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scanner Features */}
      <Card className="relative z-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            What We Can Scan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-black/20">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm">🍽️</span>
            </div>
            <div className="flex-1">
              <p>Food Items</p>
              <p className="text-sm text-muted-foreground">
                Instantly identify meals, fruits, vegetables, and drinks with AI
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-black/20">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm">📊</span>
            </div>
            <div className="flex-1">
              <p>Product Barcodes</p>
              <p className="text-sm text-muted-foreground">
                Scan packaged foods for accurate nutrition information
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-black/20">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm">🔍</span>
            </div>
            <div className="flex-1">
              <p>Nutrition Labels</p>
              <p className="text-sm text-muted-foreground">
                Extract data directly from nutrition facts labels
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Scans */}
      <Card className="relative z-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            Recent Scans
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentScans.map((scan) => (
            <div key={scan.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p>{scan.item}</p>
                  <Badge variant="outline" className="text-xs">
                    {scan.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Clock className="w-3 h-3" />
                  <span>{scan.time}</span>
                  <span>•</span>
                  <span>{scan.confidence}% confident</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{scan.calories}</p>
                <p className="text-muted-foreground text-sm">calories</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}