import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const colors = {
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

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  gradientCard: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Typography
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.dark,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.dark,
  },

  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark,
  },

  body: {
    fontSize: 16,
    color: colors.gray[700],
  },

  caption: {
    fontSize: 14,
    color: colors.gray[500],
  },

  small: {
    fontSize: 12,
    color: colors.gray[400],
  },

  // Buttons
  primaryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  secondaryButton: {
    backgroundColor: colors.gray[100],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: colors.gray[700],
    fontSize: 16,
    fontWeight: '600',
  },

  // Forms
  input: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
    marginVertical: 4,
  },

  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray[700],
    marginBottom: 4,
  },

  // Stats
  statContainer: {
    alignItems: 'center',
    padding: 16,
  },

  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
  },

  statLabel: {
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 4,
  },

  // Progress
  progressBar: {
    height: 8,
    backgroundColor: colors.gray[200],
    borderRadius: 4,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 4,
  },

  // Layout
  section: {
    marginVertical: 16,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },

  divider: {
    height: 1,
    backgroundColor: colors.gray[200],
    marginVertical: 16,
  },

  // Screen dimensions
  screenWidth,
  cardWidth: screenWidth * 0.9,
  chartHeight: 200,
});

export default globalStyles;