import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// Components
import AddPurchaseModal from '../components/AddPurchaseModal';
import BudgetProgress from '../components/BudgetProgress';
import PurchaseItem from '../components/PurchaseItem';
import StatsCard from '../components/StatsCard';

// Utils
import { StorageService } from '../utils/storage';
import { REASONS, CATEGORIES, SAMPLE_DATA } from '../utils/constants';
import { globalStyles, colors } from '../styles/globalStyles';

export default function HomeScreen() {
  const [purchases, setPurchases] = useState(SAMPLE_DATA);
  const [monthlyBudget, setMonthlyBudget] = useState(200);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load data on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      const [savedPurchases, savedBudget] = await Promise.all([
        StorageService.loadPurchases(),
        StorageService.loadBudget()
      ]);

      // If no saved purchases, use sample data
      if (savedPurchases.length === 0) {
        setPurchases(SAMPLE_DATA);
        await StorageService.savePurchases(SAMPLE_DATA);
      } else {
        setPurchases(savedPurchases);
      }

      setMonthlyBudget(savedBudget);
    } catch (error) {
      console.error('Error loading initial data:', error);
      Alert.alert('Error', 'Failed to load your data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadInitialData();
    setRefreshing(false);
  };

  const handleAddPurchase = async (newPurchase) => {
    try {
      const purchase = {
        ...newPurchase,
        id: Date.now(),
        timestamp: new Date(newPurchase.date).getTime(),
      };

      const updatedPurchases = [purchase, ...purchases];
      setPurchases(updatedPurchases);
      await StorageService.savePurchases(updatedPurchases);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding purchase:', error);
      Alert.alert('Error', 'Failed to save your purchase. Please try again.');
    }
  };

  const handleDeletePurchase = async (id) => {
    Alert.alert(
      'Delete Purchase',
      'Are you sure you want to delete this purchase?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedPurchases = purchases.filter(p => p.id !== id);
              setPurchases(updatedPurchases);
              await StorageService.savePurchases(updatedPurchases);
            } catch (error) {
              console.error('Error deleting purchase:', error);
              Alert.alert('Error', 'Failed to delete purchase. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleUpdateBudget = async (newBudget) => {
    try {
      setMonthlyBudget(newBudget);
      await StorageService.saveBudget(newBudget);
    } catch (error) {
      console.error('Error updating budget:', error);
      Alert.alert('Error', 'Failed to update budget. Please try again.');
    }
  };

  // Filter purchases for current month
  const currentMonthPurchases = purchases.filter(p => {
    const purchaseDate = new Date(p.date);
    return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
  });

  // Calculate stats
  const totalSpent = currentMonthPurchases.reduce((sum, p) => sum + p.amount, 0);
  const averagePurchase = currentMonthPurchases.length > 0 ? totalSpent / currentMonthPurchases.length : 0;
  const regretPurchases = currentMonthPurchases.filter(p => p.regret);
  const regretAmount = regretPurchases.reduce((sum, p) => sum + p.amount, 0);

  // Get top trigger
  const reasonStats = Object.keys(REASONS).map(reason => {
    const reasonPurchases = currentMonthPurchases.filter(p => p.reason === reason);
    const total = reasonPurchases.reduce((sum, p) => sum + p.amount, 0);
    return { reason, total, count: reasonPurchases.length };
  }).sort((a, b) => b.total - a.total);

  const topTrigger = reasonStats.length > 0 && reasonStats[0].total > 0 
    ? REASONS[reasonStats[0].reason].label 
    : 'None';

  const getMotivationalMessage = () => {
    const budgetPercentage = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0;
    
    if (currentMonthPurchases.length === 0) {
      return { message: "Great start! No impulse purchases yet this month.", type: "success" };
    }
    if (budgetPercentage <= 50) {
      return { message: "You're doing well! Stay within your budget.", type: "success" };
    }
    if (budgetPercentage <= 80) {
      return { message: "You're getting close to your budget limit. Consider slowing down.", type: "warning" };
    }
    if (budgetPercentage <= 100) {
      return { message: "You're very close to your budget limit. Time to pause and reflect.", type: "warning" };
    }
    return { message: "You've exceeded your budget. Let's work on better spending habits.", type: "danger" };
  };

  const motivationalMsg = getMotivationalMessage();

  if (isLoading) {
    return (
      <SafeAreaView style={[globalStyles.container, globalStyles.centered]}>
        <Text style={globalStyles.heading}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={globalStyles.gradientCard}
        >
          <Text style={[globalStyles.title, { color: 'white', marginBottom: 8 }]}>
            PausePal
          </Text>
          <Text style={[globalStyles.body, { color: 'white', opacity: 0.9, textAlign: 'center' }]}>
            Understanding your impulse purchases for better financial wellness
          </Text>
        </LinearGradient>

        {/* Motivational Banner */}
        <View style={[globalStyles.card, { 
          backgroundColor: motivationalMsg.type === 'success' ? colors.success : 
                          motivationalMsg.type === 'warning' ? colors.warning : colors.danger,
          marginTop: 0 
        }]}>
          <Text style={[globalStyles.body, { color: 'white', fontWeight: '600' }]}>
            {motivationalMsg.message}
          </Text>
        </View>

        {/* Budget Progress */}
        <BudgetProgress
          totalSpent={totalSpent}
          monthlyBudget={monthlyBudget}
          onUpdateBudget={handleUpdateBudget}
        />

        {/* Stats Grid */}
        <View style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          paddingHorizontal: 8,
          marginVertical: 8 
        }}>
          <StatsCard
            title="This Month"
            value={`$${totalSpent.toFixed(2)}`}
            color={colors.primary}
            icon="💰"
          />
          <StatsCard
            title="Purchases"
            value={currentMonthPurchases.length.toString()}
            color={colors.secondary}
            icon="🛍️"
          />
          <StatsCard
            title="Average"
            value={`$${averagePurchase.toFixed(2)}`}
            color={colors.info}
            icon="📊"
          />
          <StatsCard
            title="Top Trigger"
            value={topTrigger}
            color={colors.success}
            icon="🧠"
            small={true}
          />
        </View>

        {/* Regret Purchases */}
        {regretPurchases.length > 0 && (
          <View style={[globalStyles.card, { backgroundColor: '#FEF2F2' }]}>
            <Text style={[globalStyles.heading, { color: colors.danger, marginBottom: 8 }]}>
              ⚠️ Regret Purchases
            </Text>
            <Text style={globalStyles.body}>
              You regret {regretPurchases.length} purchases worth ${regretAmount.toFixed(2)} this month.
            </Text>
          </View>
        )}

        {/* Add Purchase Button */}
        <View style={{ paddingHorizontal: 16, marginVertical: 16 }}>
          <TouchableOpacity
            style={globalStyles.primaryButton}
            onPress={() => setShowAddModal(true)}
          >
            <Text style={globalStyles.primaryButtonText}>+ Add Purchase</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Purchases */}
        <View style={globalStyles.section}>
          <View style={globalStyles.sectionHeader}>
            <Text style={globalStyles.subtitle}>Recent Purchases</Text>
          </View>
          
          {currentMonthPurchases.length > 0 ? (
            currentMonthPurchases.slice(0, 10).map((purchase) => (
              <PurchaseItem
                key={purchase.id}
                purchase={purchase}
                onDelete={handleDeletePurchase}
              />
            ))
          ) : (
            <View style={[globalStyles.card, globalStyles.centered, { paddingVertical: 40 }]}>
              <Text style={[globalStyles.body, { color: colors.gray[500] }]}>
                No purchases this month yet
              </Text>
            </View>
          )}
        </View>

        {/* Tips Section */}
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={[globalStyles.gradientCard, { marginBottom: 20 }]}
        >
          <Text style={[globalStyles.heading, { color: 'white', marginBottom: 12 }]}>
            💡 Mindful Shopping Tips
          </Text>
          <View style={{ gap: 8 }}>
            <Text style={[globalStyles.caption, { color: 'white' }]}>
              • Wait 24 hours before making non-essential purchases
            </Text>
            <Text style={[globalStyles.caption, { color: 'white' }]}>
              • Ask yourself: "Do I need this or want this?"
            </Text>
            <Text style={[globalStyles.caption, { color: 'white' }]}>
              • Set a monthly impulse buying budget
            </Text>
            <Text style={[globalStyles.caption, { color: 'white' }]}>
              • Find alternative activities for emotional triggers
            </Text>
            <Text style={[globalStyles.caption, { color: 'white' }]}>
              • Practice the "one in, one out" rule
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>

      {/* Add Purchase Modal */}
      <AddPurchaseModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddPurchase}
      />
    </SafeAreaView>
  );
}