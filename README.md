# PausePal 🛍️

**Mindful Spending Tracker for Better Financial Wellness**

PausePal is a React Native mobile app that helps you understand and control your impulse purchasing habits. By tracking the emotional triggers behind your purchases, you can develop healthier spending patterns and achieve better financial wellness.

## Features ✨

- **📊 Purchase Tracking**: Log impulse purchases with amounts, items, and emotional triggers
- **🎯 Budget Management**: Set monthly budgets and track your spending progress
- **🧠 Emotional Awareness**: Identify patterns in your spending triggers (stress, boredom, FOMO, etc.)
- **⚠️ Regret Tracking**: Mark purchases you regret to learn from past decisions
- **📱 Mobile-First**: Designed for on-the-go tracking with a clean, intuitive interface
- **💾 Local Storage**: Your data stays private on your device using AsyncStorage
- **📈 Visual Insights**: View your spending patterns through progress bars and statistics

## Screenshots 📸

*(Add screenshots of your app here once you have it running)*

## Getting Started 🚀

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/PausePal.git
   cd PausePal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Install Expo Go from App Store (iOS) or Google Play (Android)
   - Scan the QR code displayed in your terminal with Expo Go
   - The app will load on your device

## Project Structure 📁

```
PausePal/
├── App.js                      # Main app entry point
├── app.json                    # Expo configuration
├── package.json                # Dependencies and scripts
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── AddPurchaseModal.js
│   │   ├── BudgetProgress.js
│   │   ├── PurchaseItem.js
│   │   └── StatsCard.js
│   ├── screens/               # App screens
│   │   └── HomeScreen.js
│   ├── utils/                 # Helper functions and constants
│   │   ├── constants.js
│   │   └── storage.js
│   └── styles/                # Global styles and themes
│       └── globalStyles.js
└── assets/                    # Images and static assets
```

## Usage 💡

### Adding a Purchase
1. Tap the "Add Purchase" button
2. Enter the purchase amount and item description
3. Select why you made the purchase (emotional trigger)
4. Choose the category
5. Mark if you regret the purchase (optional)
6. Save the purchase

### Setting a Budget
1. Tap "Set Budget" in the Budget Progress section
2. Enter your monthly impulse buying budget
3. Monitor your progress throughout the month

### Understanding Your Patterns
- Review your spending by emotional triggers
- Check which categories you spend most on
- Track regret purchases to learn from past decisions
- Use the motivational messages to stay on track

## Emotional Triggers 🧠

PausePal tracks these common impulse buying triggers:

- 😴 **Boredom** - Purchasing to fill time or seek entertainment
- 😢 **Depression** - Buying to improve mood or cope with sadness
- 😰 **Stress** - Shopping as a stress relief mechanism
- 😟 **Anxiety** - Purchasing to feel more secure or in control
- 🎉 **Celebration** - Buying to reward yourself or celebrate
- 👥 **Peer Pressure** - Purchasing due to social influence
- 😱 **FOMO** - Fear of missing out on deals or trends
- 🛍️ **Retail Therapy** - Shopping as emotional self-care

## Development 🛠️

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start and run on Android
- `npm run ios` - Start and run on iOS
- `npm run web` - Start and run on web

### Key Dependencies

- **Expo** - React Native development platform
- **AsyncStorage** - Local data persistence
- **Expo Linear Gradient** - Beautiful gradient backgrounds
- **React Native Picker** - Form selection components

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Roadmap 🗺️

- [ ] Charts and analytics for spending patterns
- [ ] Export data functionality
- [ ] Spending goals and achievements
- [ ] Dark mode support
- [ ] Notification reminders
- [ ] Category customization
- [ ] Data backup and sync

## Privacy 🔒

PausePal prioritizes your privacy:
- All data is stored locally on your device
- No personal information is collected or transmitted
- No third-party analytics or tracking
- You have full control over your data

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💬

If you find PausePal helpful, please consider:
- ⭐ Starring this repository
- 🐛 Reporting bugs or requesting features via Issues
- 🔄 Sharing with friends who might benefit from mindful spending

## Acknowledgments 🙏

- Inspired by behavioral psychology research on impulse buying
- Built with love using Expo and React Native
- Icons and design inspiration from modern mobile app patterns

---

**Made with ❤️ to help you pause before you purchase**