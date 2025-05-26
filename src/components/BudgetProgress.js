import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';

import { globalStyles, colors } from '../styles/globalStyles';

export default function BudgetProgress({ totalSpent, monthlyBudget, onUpdateBudget }) {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgetInput, setBudgetInput] = useState(monthlyBudget.toString());

  const budgetPercentage = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0;
  const budgetRemaining = monthlyBudget - totalSpent;

  const getProgressColor = () => {
    if (budgetPercentage <= 70) return colors.success;
    if (budgetPercentage <= 90) return colors.warning;
    return colors.danger;
  };

  const handleUpdateBudget = () => {
    const newBudget = parseFloat(budgetInput);
    if (isNaN(newBudget) || newBudget <= 0) {
      Alert.alert('Error', 'Please enter a valid budget amount');
      return;
    }
    
    onUpdateBudget(newBudget);
    setShowBudgetModal(false);
  };

  return (
    <>
      <View style={globalStyles.card}>
        <View style={globalStyles.spaceBetween}>
          <Text style={globalStyles.heading}>Monthly Budget Progress</Text>
          <TouchableOpacity onPress={() => setShowBudgetModal(true)}>
            <Text style={[globalStyles.caption, { color: colors.primary, fontWeight: '600' }]}>
              Set Budget
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 16 }}>
          <View style={globalStyles.spaceBetween}>
            <Text style={globalStyles.caption}>
              ${totalSpent.toFixed(2)} spent
            </Text>
            <Text style={globalStyles.caption}>
              ${monthlyBudget.toFixed(2)} budget
            </Text>
          </View>

          <View style={[globalStyles.progressBar, { marginTop: 8 }]}>
            <View
              style={[
                globalStyles.progressFill,
                {
                  width: `${Math.min(budgetPercentage, 100)}%`,
                  backgroundColor: getProgressColor(),
                }
              ]}
            />
          </View>

          <Text style={[
            globalStyles.caption,
            {
              marginTop: 8,
              fontWeight: '600',
              color: budgetRemaining >= 0 ? colors.success : colors.danger,
            }
          ]}>
            {budgetRemaining >= 0 
              ? `$${budgetRemaining.toFixed(2)} remaining` 
              : `$${Math.abs(budgetRemaining).toFixed(2)} over budget`
            }
          </Text>
        </View>
      </View>

      {/* Budget Setting Modal */}
      <Modal
        visible={showBudgetModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowBudgetModal(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
          <View style={[globalStyles.card, { width: '100%', maxWidth: 300 }]}>
            <View style={globalStyles.spaceBetween}>
              <Text style={globalStyles.heading}>Set Monthly Budget</Text>
              <TouchableOpacity onPress={() => setShowBudgetModal(false)}>
                <Text style={[globalStyles.heading, { color: colors.gray[500] }]}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={globalStyles.label}>Monthly Budget ($)</Text>
              <TextInput
                style={globalStyles.input}
                value={budgetInput}
                onChangeText={setBudgetInput}
                placeholder="200.00"
                keyboardType="decimal-pad"
              />
            </View>

            <TouchableOpacity
              style={[globalStyles.primaryButton, { marginTop: 16 }]}
              onPress={handleUpdateBudget}
            >
              <Text style={globalStyles.primaryButtonText}>Save Budget</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}