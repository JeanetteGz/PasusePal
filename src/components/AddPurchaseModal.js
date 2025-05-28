import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  FlatList,
} from 'react-native';

// Define constants locally to avoid import issues
const REASONS = {
  boredom: { label: 'Boredom', color: '#8B5CF6', icon: '😴' },
  depression: { label: 'Depression', color: '#EF4444', icon: '😢' },
  stress: { label: 'Stress', color: '#F59E0B', icon: '😰' },
  anxiety: { label: 'Anxiety', color: '#EC4899', icon: '😟' },
  celebration: { label: 'Celebration', color: '#10B981', icon: '🎉' },
  peer_pressure: { label: 'Peer Pressure', color: '#6366F1', icon: '👥' },
  fomo: { label: 'FOMO', color: '#F97316', icon: '😱' },
  retail_therapy: { label: 'Retail Therapy', color: '#14B8A6', icon: '🛍️' }
};

const CATEGORIES = [
  '👗 Clothing', 
  '📱 Electronics', 
  '🍕 Food & Dining', 
  '🎬 Entertainment', 
  '💄 Beauty & Personal Care', 
  '🏠 Home & Garden', 
  '📚 Books & Media', 
  '⚽ Sports & Fitness', 
  '✈️ Travel', 
  '🛒 Other'
];

const colors = {
  primary: '#8B5CF6',
  secondary: '#EC4899',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
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
  }
};

export default function AddPurchaseModal({ visible, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    amount: '',
    item: '',
    reason: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    regret: false,
  });

  const [focusedField, setFocusedField] = useState(null);
  const [showReasonPicker, setShowReasonPicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const handleSubmit = () => {
    // Validation
    if (!formData.amount || !formData.item || !formData.reason || !formData.category) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount greater than 0');
      return;
    }

    const purchaseData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    onSubmit(purchaseData);
    
    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      amount: '',
      item: '',
      reason: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      regret: false,
    });
    setFocusedField(null);
    setShowReasonPicker(false);
    setShowCategoryPicker(false);
  };

  const handleReasonSelect = (reasonKey) => {
    setFormData({ ...formData, reason: reasonKey });
    setShowReasonPicker(false);
  };

  const handleCategorySelect = (category) => {
    setFormData({ ...formData, category: category });
    setShowCategoryPicker(false);
  };

  const getSelectedReasonLabel = () => {
    if (!formData.reason) return "Select your emotional trigger...";
    const reason = REASONS[formData.reason];
    return `${reason.icon} ${reason.label}`;
  };

  const getSelectedCategoryLabel = () => {
    if (!formData.category) return "Select category...";
    return formData.category;
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Add New Purchase</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.headerSubtitle}>Track your impulse purchase to build better habits</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Amount Input */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>How much did you spend? *</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={[
                  styles.amountInput,
                  focusedField === 'amount' && styles.inputFocused
                ]}
                value={formData.amount}
                onChangeText={(text) => setFormData({ ...formData, amount: text })}
                placeholder="0.00"
                keyboardType="decimal-pad"
                onFocus={() => setFocusedField('amount')}
                onBlur={() => setFocusedField(null)}
              />
            </View>
          </View>

          {/* Item Input */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>What did you buy? *</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'item' && styles.inputFocused
              ]}
              value={formData.item}
              onChangeText={(text) => setFormData({ ...formData, item: text })}
              placeholder="e.g., Blue summer dress, Wireless headphones..."
              onFocus={() => setFocusedField('item')}
              onBlur={() => setFocusedField(null)}
              multiline={true}
              numberOfLines={2}
            />
          </View>

          {/* Reason Selector */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Why did you buy it? *</Text>
            <Text style={styles.fieldHelper}>Understanding your triggers helps build awareness</Text>
            <TouchableOpacity
              style={styles.selectorButton}
              onPress={() => setShowReasonPicker(true)}
            >
              <Text style={[
                styles.selectorText,
                !formData.reason && styles.placeholderText
              ]}>
                {getSelectedReasonLabel()}
              </Text>
              <Text style={styles.selectorArrow}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Category Selector */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Category *</Text>
            <TouchableOpacity
              style={styles.selectorButton}
              onPress={() => setShowCategoryPicker(true)}
            >
              <Text style={[
                styles.selectorText,
                !formData.category && styles.placeholderText
              ]}>
                {getSelectedCategoryLabel()}
              </Text>
              <Text style={styles.selectorArrow}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Date Input */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>When did you buy it?</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'date' && styles.inputFocused
              ]}
              value={formData.date}
              onChangeText={(text) => setFormData({ ...formData, date: text })}
              placeholder="YYYY-MM-DD"
              onFocus={() => setFocusedField('date')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          {/* Regret Checkbox */}
          <View style={styles.fieldContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setFormData({ ...formData, regret: !formData.regret })}
            >
              <View style={[
                styles.checkbox,
                formData.regret && styles.checkboxChecked
              ]}>
                {formData.regret && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <View style={styles.checkboxTextContainer}>
                <Text style={styles.checkboxLabel}>I regret this purchase</Text>
                <Text style={styles.checkboxHelper}>
                  Tracking regret helps you learn from past decisions
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Spacer for bottom padding */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleClose}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Add Purchase</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  
  // Header
  header: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[800],
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.gray[500],
    lineHeight: 22,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: colors.gray[600],
    fontWeight: '600',
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  
  // Field Container
  fieldContainer: {
    marginTop: 32,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.gray[800],
    marginBottom: 8,
  },
  fieldHelper: {
    fontSize: 14,
    color: colors.gray[500],
    marginBottom: 12,
    lineHeight: 20,
  },

  // Amount Input
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.gray[200],
    paddingHorizontal: 20,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[700],
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    color: colors.gray[800],
    paddingVertical: 16,
  },

  // Regular Input
  input: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.gray[200],
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.gray[800],
    textAlignVertical: 'top',
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },

  // Picker
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.gray[200],
    overflow: 'hidden',
  },
  picker: {
    height: 60,
  },

  // Custom Selector Button
  selectorButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.gray[200],
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorText: {
    fontSize: 16,
    color: colors.gray[800],
    flex: 1,
  },
  placeholderText: {
    color: colors.gray[400],
  },
  selectorArrow: {
    fontSize: 14,
    color: colors.gray[500],
    marginLeft: 8,
  },

  // Picker Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pickerModal: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    maxHeight: '70%',
    overflow: 'hidden',
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  pickerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.gray[800],
  },
  pickerClose: {
    fontSize: 18,
    color: colors.gray[500],
    fontWeight: '600',
  },
  pickerScrollView: {
    maxHeight: 400,
  },
  pickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  pickerOptionSelected: {
    backgroundColor: colors.primary + '10',
  },
  pickerOptionText: {
    fontSize: 16,
    color: colors.gray[800],
    flex: 1,
  },
  pickerOptionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  reasonIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  reasonTextContainer: {
    flex: 1,
  },
  selectedCheck: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  // Checkbox
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.gray[300],
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxTextContainer: {
    flex: 1,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.gray[800],
    marginBottom: 4,
  },
  checkboxHelper: {
    fontSize: 14,
    color: colors.gray[500],
    lineHeight: 20,
  },

  // Bottom Actions
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray[700],
  },
  submitButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },

  // Spacer
  bottomSpacer: {
    height: 32,
  },
});