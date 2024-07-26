import React from 'react';
import BackButton from '../../components/BackButton';
import { View, Text } from 'react-native';

export default function CuponsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <BackButton/>
      <Text>cupons</Text>
    </View>
  );
}
