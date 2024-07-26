import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BackButton from '../../components/BackButton';

const AjudaScreen = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:belezaxpressajuda@gmail.com');
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.header}>
        <MaterialCommunityIcons name="help-circle" size={100} color="#4F4F4F" />
        <Text style={styles.title}>Precisa de ajuda?</Text>
        <Text style={styles.message}>
          Se você tiver alguma dúvida ou precisar de assistência, entre em contato conosco.
        </Text>
        <TouchableOpacity style={styles.emailButton} onPress={handleEmailPress}>
          <Text style={styles.emailButtonText}>Email: belezaxpressajuda@gmail.com</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: '#4F4F4F',
    marginTop: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#808080',
    marginTop: 20,
    textAlign: 'center',
  },
  emailButton: {
    backgroundColor: '#4F4F4F',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  emailButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
});

export default AjudaScreen;
