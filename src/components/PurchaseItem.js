import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { REASONS } from '../utils/constants';
import { globalStyles, colors } from '../styles/globalStyles';

export default function PurchaseItem({ purchase, onDelete }) {
  const reason = REASONS[purchase.reason];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <View style={[
      globalStyles.card,
      purchase.regret && { backgroundColor: '#FEF2F2', borderLeftWidth: 4, borderLeftColor: colors.danger }
    ]}>
      <View style={globalStyles.spaceBetween}>
        <View style={[globalStyles.row, { flex: 1 }]}>
          <Text style={{ fontSize: 24, marginRight: 12 }}>
            {reason?.icon || '🛍️'}
          </Text>
          
          <View style={{ flex: 1 }}>
            <Text style={[globalStyles.heading, { marginBottom: 4 }]}>
              {purchase.item}
            </Text>
            <View style={globalStyles.row}>
              <Text style={[globalStyles.caption, { marginRight: 8 }]}>
                {reason?.label || 'Unknown'}
              </Text>
              <Text style={[globalStyles.caption, { marginRight: 8 }]}>
                • {purchase.category}
              </Text>
              <Text style={globalStyles.caption}>
                • {formatDate(purchase.date)}
              </Text>
            </View>
            {purchase.regret && (
              <Text style={[globalStyles.small, { color: colors.danger, marginTop: 4 }]}>
                ⚠️ Regret purchase
              </Text>
            )}
          </View>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[globalStyles.heading, { fontSize: 18 }]}>
            ${purchase.amount.toFixed(2)}
          </Text>
          <TouchableOpacity
            onPress={() => onDelete(purchase.id)}
            style={{
              marginTop: 8,
              padding: 4,
            }}
          >
            <Text style={[globalStyles.small, { color: colors.danger }]}>
              🗑️ Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}