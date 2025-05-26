export const REASONS = {
  boredom: { label: 'Boredom', color: '#8B5CF6', icon: '😴' },
  depression: { label: 'Depression', color: '#EF4444', icon: '😢' },
  stress: { label: 'Stress', color: '#F59E0B', icon: '😰' },
  anxiety: { label: 'Anxiety', color: '#EC4899', icon: '😟' },
  celebration: { label: 'Celebration', color: '#10B981', icon: '🎉' },
  peer_pressure: { label: 'Peer Pressure', color: '#6366F1', icon: '👥' },
  fomo: { label: 'FOMO', color: '#F97316', icon: '😱' },
  retail_therapy: { label: 'Retail Therapy', color: '#14B8A6', icon: '🛍️' }
};

export const CATEGORIES = [
  'Clothing', 
  'Electronics', 
  'Food & Dining', 
  'Entertainment', 
  'Beauty & Personal Care', 
  'Home & Garden', 
  'Books & Media', 
  'Sports & Fitness', 
  'Travel', 
  'Other'
];

export const SAMPLE_DATA = [
  { 
    id: 1, 
    amount: 45.99, 
    reason: 'boredom', 
    category: 'Clothing', 
    item: 'Summer dress', 
    date: '2025-05-20', 
    timestamp: Date.now() - 432000000, 
    regret: false 
  },
  { 
    id: 2, 
    amount: 129.99, 
    reason: 'stress', 
    category: 'Electronics', 
    item: 'Wireless headphones', 
    date: '2025-05-18', 
    timestamp: Date.now() - 604800000, 
    regret: true 
  },
  { 
    id: 3, 
    amount: 23.50, 
    reason: 'depression', 
    category: 'Food & Dining', 
    item: 'Comfort food delivery', 
    date: '2025-05-15', 
    timestamp: Date.now() - 864000000, 
    regret: false 
  },
  { 
    id: 4, 
    amount: 67.89, 
    reason: 'fomo', 
    category: 'Beauty & Personal Care', 
    item: 'Skincare set', 
    date: '2025-05-12', 
    timestamp: Date.now() - 1123200000, 
    regret: true 
  },
  { 
    id: 5, 
    amount: 89.99, 
    reason: 'retail_therapy', 
    category: 'Entertainment', 
    item: 'Video game', 
    date: '2025-05-10', 
    timestamp: Date.now() - 1296000000, 
    regret: false 
  }
];

// Color palette for consistent theming
export const COLORS = {
  primary: '#8B5CF6',
  secondary: '#EC4899',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#6366F1',
  light: '#F8FAFC',
  dark: '#1F2937',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  }
};

// Motivational messages based on spending patterns
export const MOTIVATIONAL_MESSAGES = {
  excellent: [
    "You're crushing your budget goals! 🎯",
    "Fantastic self-control this month! 💪",
    "Your mindful spending is paying off! ✨"
  ],
  good: [
    "You're doing great! Stay on track! 👍",
    "Nice job managing your impulses! 🌟",
    "Keep up the mindful spending! 🧘‍♀️"
  ],
  warning: [
    "Time to pause and reflect on your purchases 🤔",
    "Consider what's triggering these purchases 💭",
    "Remember your financial goals! 🎯"
  ],
  danger: [
    "Let's work on understanding your spending triggers 🔍",
    "Time for some serious reflection on spending habits 📝",
    "Your future self will thank you for pausing now ⏸️"
  ]
};

// App configuration constants
export const APP_CONFIG = {
  defaultBudget: 200,
  maxRecentPurchases: 10,
  storageKeys: {
    purchases: '@pausepal_purchases',
    budget: '@pausepal_monthly_budget',
    settings: '@pausepal_settings'
  }
};