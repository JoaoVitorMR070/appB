import React from 'react';
import { View, Text } from 'react-native';
import BackButton from '../../components/BackButton';

export default function NotificacoesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <BackButton/>
      <Text>NotificaçõesScreen</Text>
    </View>
  );
}
