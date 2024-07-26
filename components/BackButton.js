import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={goBack} style={styles.backButton}>
      <MaterialCommunityIcons name="arrow-left" size={25} color="#1C2120" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
});

export default BackButton;
