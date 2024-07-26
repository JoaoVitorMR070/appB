import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import BackButton from '../../components/BackButton';
import firebase from '../../firebase';

export default function SegurancaScreen() {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const reauthenticate = (currentPassword) => {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };

  const handleChangePassword = () => {
    if (currentPassword === '' || newPassword === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    reauthenticate(currentPassword).then(() => {
      const user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        Alert.alert('Sucesso', 'Senha alterada com sucesso.');
        setCurrentPassword('');
        setNewPassword('');
      }).catch((error) => {
        Alert.alert('Erro', error.message);
      });
    }).catch((error) => {
      Alert.alert('Erro', 'Senha atual incorreta.');
    });
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Segurança</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha Atual"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Alterar Senha</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4F4F4F',
    marginTop:40
  },
  input: {
    height: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4F4F4F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});


