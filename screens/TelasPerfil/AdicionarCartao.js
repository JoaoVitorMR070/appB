import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import BackButton from '../../components/BackButton';
import firebase from '../../firebase';

export default function AdicionarCartaoScreen() {
  const navigation = useNavigation();
  const [numeroCartao, setNumeroCartao] = useState('');
  const [nomeTitular, setNomeTitular] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [numeroCartao, nomeTitular, validade, cvv]);

  const validateForm = () => {
    const isNumeroCartaoValid = /^4[0-9]{12}(?:[0-9]{3})?$/.test(numeroCartao.replace(/ /g, '')); // Simplificação para Visa
    const isNomeTitularValid = nomeTitular.trim().length > 0;
    const isValidadeValid = /^\d{2}\/\d{2}$/.test(validade);
    const isCvvValid = /^\d{3,4}$/.test(cvv);

    setIsValid(isNumeroCartaoValid && isNomeTitularValid && isValidadeValid && isCvvValid);
  };

  const handleAdicionarCartao = async () => {
    if (!isValid) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
      return;
    }

    try {
      const user = firebase.auth().currentUser;
      if (user) {
        const userId = user.uid;
        const cartoesRef = firebase.database().ref(`usuarios/${userId}/cartoes`);
        const novoCartaoRef = cartoesRef.push();

        await novoCartaoRef.set({
          numeroCartao,
          nomeTitular,
          validade,
          cvv,
        });

        Alert.alert('Sucesso', 'Cartão cadastrado com sucesso.');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Erro ao cadastrar cartão:', error.message);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o cartão. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Adicionar Cartão</Text>
      <TextInputMask
        type={'credit-card'}
        options={{
          obfuscated: false,
          issuer: 'visa-or-mastercard',
        }}
        value={numeroCartao}
        onChangeText={setNumeroCartao}
        placeholder="Número do Cartão"
        style={styles.input}
      />
      <TextInput
        value={nomeTitular}
        onChangeText={setNomeTitular}
        placeholder="Nome do Titular"
        style={styles.input}
      />
      <View style={styles.row}>
        <TextInputMask
          type={'custom'}
          options={{
            mask: '99/99',
          }}
          value={validade}
          onChangeText={setValidade}
          placeholder="MM/AA"
          style={[styles.input, styles.inputSmall]}
        />
        <TextInput
          value={cvv}
          onChangeText={setCvv}
          placeholder="CVV"
          style={[styles.input, styles.inputSmall]}
          keyboardType="numeric"
          maxLength={4}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isValid ? '#1C2120' : '#B0B0B0' }]}
        onPress={handleAdicionarCartao}
        disabled={!isValid}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#4F4F4F',
    marginBottom: 20,
    marginTop: 60,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#1C2120',
    fontSize: 16,
    color: '#1C2120',
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
  inputSmall: {
    flex: 1,
    marginHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
