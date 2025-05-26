import React from 'react';
import { View, Text } from 'react-native';

import { globalStyles } from '../styles/globalStyles';

export default function StatsCard({ title, value, color, icon, small = false }) {
  const cardWidth = small ? '48%' : '48%';
  
  return (
    <View style={[
      globalStyles.card,
      {
        width: cardWidth,
        marginHorizontal: '1%',
        marginVertical: 4,
        borderLeftWidth: 4,
        borderLeftColor: color,
      }
    ]}>
      <View style={globalStyles.row}>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: color + '20',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}>
          <Text style={{ fontSize: 20 }}>{icon}</Text>
        </View>
        
        <View style={{ flex: 1 }}>
          <Text style={[globalStyles.caption, { marginBottom: 2 }]}>
            {title}
          </Text>
          <Text style={[
            globalStyles.heading, 
            { 
              fontSize: small ? 14 : 18,
              color: color,
              numberOfLines: 1,
            }
          ]}>
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
}