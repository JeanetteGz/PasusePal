import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { REASONS, CATEGORIES } from '../utils/constants';
import { globalStyles, colors } from '../styles/globalStyles';

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

  const handleSubmit = () => {
    // Validation
    if (!formData.amount || !formData.item || !formData.reason || !formData.category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const purchaseData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    onSubmit(purchaseData);
    
    // Reset form
    setFormData({
      amount: '',
      item: '',
      reason: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      regret: false,
    });
  };

  const handleClose = () => {
    setFormData({
      amount: '',
      item: '',
      reason: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      regret: false,
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={globalStyles.container}>
        {/* Header */}
        <View style={[globalStyles.card, { marginTop: 0, borderRadius: 0 }]}>
          <View style={globalStyles.spaceBetween}>
            <Text style={globalStyles.subtitle}>Add New Purchase</Text>
            <TouchableOpacity onPress={handleClose}>
              <Text style={[globalStyles.heading, { color: colors.gray[500] }]}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={globalStyles.card}>
            {/* Amount Input */}
            <View style={{ marginBottom: 16 }}>
              <Text style={globalStyles.label}>Amount ($) *</Text>
              <TextInput
                style={[
                  globalStyles.input,
                  focusedField === 'amount' && globalStyles.inputFocused
                ]}
                value={formData.amount}
                onChangeText={(text) => setFormData({ ...formData, amount: text })}
                placeholder="0.00"
                keyboardType="decimal-pad"
                onFocus={() => setFocusedField('amount')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Item Input */}
            <View style={{ marginBottom: 16 }}>
              <Text style={globalStyles.label}>What did you buy? *</Text>
              <TextInput
                style={[
                  globalStyles.input,
                  focusedField === 'item' && globalStyles.inputFocused
                ]}
                value={formData.item}
                onChangeText={(text) => setFormData({ ...formData, item: text })}
                placeholder="e.g., Blue sweater"
                onFocus={() => setFocusedField('item')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Reason Picker */}
            <View style={{ marginBottom: 16 }}>
              <Text style={globalStyles.label}>Why did you buy it? *</Text>
              <View style={globalStyles.input}>
                <Picker
                  selectedValue={formData.reason}
                  onValueChange={(value) => setFormData({ ...formData, reason: value })}
                  style={{ height: 50 }}
                >
                  <Picker.Item label="Select a reason..." value="" />
                  {Object.entries(REASONS).map(([key, reason]) => (
                    <Picker.Item 
                      key={key} 
                      label={`${reason.icon} ${reason.label}`} 
                      value={key} 
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Category Picker */}
            <View style={{ marginBottom: 16 }}>
              <Text style={globalStyles.label}>Category *</Text>
              <View style={globalStyles.input}>
                <Picker
                  selectedValue={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  style={{ height: 50 }}
                >
                  <Picker.Item label="Select category..." value="" />
                  {CATEGORIES.map((category) => (
                    <Picker.Item 
                      key={category} 
                      label={category} 
                      value={category} 
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Date Input */}
            <View style={{ marginBottom: 16 }}>
              <Text style={globalStyles.label}>Date</Text>
              <TextInput
                style={[
                  globalStyles.input,
                  focusedField === 'date' && globalStyles.inputFocused
                ]}
                value={formData.date}
                onChangeText={(text) => setFormData({ ...formData, date: text })}
                placeholder="YYYY-MM-DD"
                onFocus={() => setFocusedField('date')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Regret Checkbox */}
            <TouchableOpacity
              style={[globalStyles.row, { marginBottom: 24 }]}
              onPress={() => setFormData({ ...formData, regret: !formData.regret })}
            >
              <View style={{
                width: 20,
                height: 20,
                borderWidth: 2,
                borderColor: formData.regret ? colors.primary : colors.gray[300],
                backgroundColor: formData.regret ? colors.primary : 'transparent',
                borderRadius: 4,
                marginRight: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {formData.regret && (
                  <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>✓</Text>
                )}
              </View>
              <Text style={globalStyles.body}>I regret this purchase</Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity
              style={globalStyles.primaryButton}
              onPress={handleSubmit}
            >
              <Text style={globalStyles.primaryButtonText}>Add Purchase</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}