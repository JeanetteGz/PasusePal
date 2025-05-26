import AsyncStorage from '@react-native-async-storage/async-storage';

const PURCHASES_KEY = '@pausepal_purchases';
const BUDGET_KEY = '@pausepal_monthly_budget';
const SETTINGS_KEY = '@pausepal_settings';

export const StorageService = {
  // Purchase operations
  async savePurchases(purchases) {
    try {
      const jsonValue = JSON.stringify(purchases);
      await AsyncStorage.setItem(PURCHASES_KEY, jsonValue);
      console.log('Purchases saved successfully');
    } catch (error) {
      console.error('Error saving purchases:', error);
      throw new Error('Failed to save purchases');
    }
  },

  async loadPurchases() {
    try {
      const jsonValue = await AsyncStorage.getItem(PURCHASES_KEY);
      const purchases = jsonValue != null ? JSON.parse(jsonValue) : [];
      console.log('Purchases loaded successfully:', purchases.length, 'items');
      return purchases;
    } catch (error) {
      console.error('Error loading purchases:', error);
      return [];
    }
  },

  async addPurchase(purchase) {
    try {
      const existingPurchases = await this.loadPurchases();
      const updatedPurchases = [purchase, ...existingPurchases];
      await this.savePurchases(updatedPurchases);
      return updatedPurchases;
    } catch (error) {
      console.error('Error adding purchase:', error);
      throw new Error('Failed to add purchase');
    }
  },

  async deletePurchase(purchaseId) {
    try {
      const existingPurchases = await this.loadPurchases();
      const updatedPurchases = existingPurchases.filter(p => p.id !== purchaseId);
      await this.savePurchases(updatedPurchases);
      return updatedPurchases;
    } catch (error) {
      console.error('Error deleting purchase:', error);
      throw new Error('Failed to delete purchase');
    }
  },

  async updatePurchase(purchaseId, updatedData) {
    try {
      const existingPurchases = await this.loadPurchases();
      const updatedPurchases = existingPurchases.map(p => 
        p.id === purchaseId ? { ...p, ...updatedData } : p
      );
      await this.savePurchases(updatedPurchases);
      return updatedPurchases;
    } catch (error) {
      console.error('Error updating purchase:', error);
      throw new Error('Failed to update purchase');
    }
  },

  // Budget operations
  async saveBudget(budget) {
    try {
      const jsonValue = JSON.stringify(budget);
      await AsyncStorage.setItem(BUDGET_KEY, jsonValue);
      console.log('Budget saved successfully:', budget);
    } catch (error) {
      console.error('Error saving budget:', error);
      throw new Error('Failed to save budget');
    }
  },

  async loadBudget() {
    try {
      const jsonValue = await AsyncStorage.getItem(BUDGET_KEY);
      const budget = jsonValue != null ? JSON.parse(jsonValue) : 200; // Default budget
      console.log('Budget loaded successfully:', budget);
      return budget;
    } catch (error) {
      console.error('Error loading budget:', error);
      return 200; // Default fallback
    }
  },

  // Settings operations
  async saveSettings(settings) {
    try {
      const jsonValue = JSON.stringify(settings);
      await AsyncStorage.setItem(SETTINGS_KEY, jsonValue);
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      throw new Error('Failed to save settings');
    }
  },

  async loadSettings() {
    try {
      const jsonValue = await AsyncStorage.getItem(SETTINGS_KEY);
      const settings = jsonValue != null ? JSON.parse(jsonValue) : {
        notifications: true,
        currency: 'USD',
        theme: 'light'
      };
      console.log('Settings loaded successfully');
      return settings;
    } catch (error) {
      console.error('Error loading settings:', error);
      return {
        notifications: true,
        currency: 'USD',
        theme: 'light'
      };
    }
  },

  // Data management operations
  async clearAllData() {
    try {
      await AsyncStorage.multiRemove([PURCHASES_KEY, BUDGET_KEY, SETTINGS_KEY]);
      console.log('All data cleared successfully');
    } catch (error) {
      console.error('Error clearing data:', error);
      throw new Error('Failed to clear data');
    }
  },

  async exportData() {
    try {
      const [purchases, budget, settings] = await Promise.all([
        this.loadPurchases(),
        this.loadBudget(),
        this.loadSettings()
      ]);

      const exportData = {
        purchases,
        budget,
        settings,
        exportDate: new Date().toISOString(),
        appVersion: '1.0.0'
      };

      return exportData;
    } catch (error) {
      console.error('Error exporting data:', error);
      throw new Error('Failed to export data');
    }
  },

  async importData(importData) {
    try {
      if (!importData || typeof importData !== 'object') {
        throw new Error('Invalid import data format');
      }

      const { purchases, budget, settings } = importData;

      if (purchases && Array.isArray(purchases)) {
        await this.savePurchases(purchases);
      }

      if (budget && typeof budget === 'number') {
        await this.saveBudget(budget);
      }

      if (settings && typeof settings === 'object') {
        await this.saveSettings(settings);
      }

      console.log('Data imported successfully');
    } catch (error) {
      console.error('Error importing data:', error);
      throw new Error('Failed to import data');
    }
  },

  // Utility functions
  async getStorageSize() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const pausePalKeys = keys.filter(key => key.startsWith('@pausepal_'));
      
      let totalSize = 0;
      for (const key of pausePalKeys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += new Blob([value]).size;
        }
      }

      return {
        keys: pausePalKeys.length,
        sizeBytes: totalSize,
        sizeMB: (totalSize / (1024 * 1024)).toFixed(2)
      };
    } catch (error) {
      console.error('Error getting storage size:', error);
      return { keys: 0, sizeBytes: 0, sizeMB: '0.00' };
    }
  },

  // Data validation
  validatePurchase(purchase) {
    const requiredFields = ['amount', 'reason', 'category', 'item', 'date'];
    
    for (const field of requiredFields) {
      if (!purchase[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    if (typeof purchase.amount !== 'number' || purchase.amount <= 0) {
      throw new Error('Amount must be a positive number');
    }

    if (typeof purchase.item !== 'string' || purchase.item.trim().length === 0) {
      throw new Error('Item description is required');
    }

    return true;
  },

  // Analytics helpers
  async getPurchaseStats(startDate, endDate) {
    try {
      const purchases = await this.loadPurchases();
      const filteredPurchases = purchases.filter(p => {
        const purchaseDate = new Date(p.date);
        return purchaseDate >= startDate && purchaseDate <= endDate;
      });

      const totalAmount = filteredPurchases.reduce((sum, p) => sum + p.amount, 0);
      const totalCount = filteredPurchases.length;
      const averageAmount = totalCount > 0 ? totalAmount / totalCount : 0;

      // Group by reason
      const reasonStats = {};
      filteredPurchases.forEach(p => {
        if (!reasonStats[p.reason]) {
          reasonStats[p.reason] = { count: 0, amount: 0 };
        }
        reasonStats[p.reason].count++;
        reasonStats[p.reason].amount += p.amount;
      });

      // Group by category
      const categoryStats = {};
      filteredPurchases.forEach(p => {
        if (!categoryStats[p.category]) {
          categoryStats[p.category] = { count: 0, amount: 0 };
        }
        categoryStats[p.category].count++;
        categoryStats[p.category].amount += p.amount;
      });

      return {
        totalAmount,
        totalCount,
        averageAmount,
        reasonStats,
        categoryStats,
        regretCount: filteredPurchases.filter(p => p.regret).length,
        regretAmount: filteredPurchases.filter(p => p.regret).reduce((sum, p) => sum + p.amount, 0)
      };
    } catch (error) {
      console.error('Error getting purchase stats:', error);
      throw new Error('Failed to get purchase statistics');
    }
  }
};