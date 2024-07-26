import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import firebase from '../../firebase'; // Importa a configuração do Firebase

const TrocarSenha = () => {
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [codigoEnviado, setCodigoEnviado] = useState('');
  const [codigoVerificado, setCodigoVerificado] = useState(false);
  const navigation = useNavigation();

  const gerarCodigo = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendCode = async () => {
    try {
      console.log('Verificando email no Realtime Database:', email);
      
      // Verifica se o email está registrado no Realtime Database
      const userRef = firebase.database().ref('users');
      const snapshot = await userRef.orderByChild('email').equalTo(email).once('value');
      
      if (!snapshot.exists()) {
        Alert.alert('Email não encontrado. Por favor, verifique e tente novamente.');
        return;
      }

      const codigoGerado = gerarCodigo();
      setCodigoEnviado(codigoGerado);

      // Envia o código de verificação usando Firebase Functions
      const sendVerificationCode = firebase.functions().httpsCallable('sendVerificationCode');
      const result = await sendVerificationCode({ email, codigo: codigoGerado });

      if (result.data.success) {
        Alert.alert('Código enviado para o email!');
      } else {
        Alert.alert('Erro ao enviar código:', result.data.error);
      }
    } catch (error) {
      console.log('Erro ao verificar email no Realtime Database:', error);
      Alert.alert('Erro ao verificar email:', error.message);
    }
  };

  const handleConcluir = () => {
    if (codigo === codigoEnviado) {
      setCodigoVerificado(true);
      Alert.alert('Código verificado com sucesso!');
      navigation.navigate('NovaTela'); // Substitua 'NovaTela' pelo nome da tela que você deseja navegar
    } else {
      Alert.alert('Código incorreto. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.arealogin}>
        <View style={styles.login}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Login')}>
            <FontAwesome name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.form}>
            <Text style={styles.titulo}>Recuperar Senha</Text>
            <Text style={styles.subtitle}>
              Precisamos enviar um código para o seu e-mail a fim de recuperar
              a sua senha.
            </Text>

            <Text style={styles.textinpu}>EMAIL</Text>
            <TextInput
              style={styles.logininput}
              placeholder="hello@reallygreatsite.com"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              style={styles.enviarButton}
              onPress={handleSendCode}>
              <Text style={styles.textEnviar}>ENVIAR</Text>
            </TouchableOpacity>

            <Text style={styles.textinpu}>CÓDIGO</Text>
            <TextInput
              style={styles.logininput}
              placeholder="Seu código"
              value={codigo}
              onChangeText={setCodigo}
            />

            <TouchableOpacity style={styles.loginButon} onPress={handleConcluir}>
              <Text style={styles.texButon}>Concluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C2120',
    flex: 1,
    padding: 35,
  },
  arealogin: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  login: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1C2120',
    borderRadius: 10,
    width: 355,
    height: '100%',
    padding: 45,
  },
  logininput: {
    backgroundColor: '#D4D4D4',
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center',
    outline: 'none',
    width: 276.3,
    marginTop: 10,
    height: 45,
    borderRadius: 17,
  },
  textinpu: {
    color: '#8F8E8E',
    marginLeft: 18,
    fontSize: 10.5,
  },
  texButon: {
    color: '#ffff',
    textAlign: 'center',
    fontSize: 17,
  },
  loginButon: {
    backgroundColor: 'black',
    marginTop: 17,
    width: 254.2,
    alignSelf: 'center',
    height: 44.4,
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  form: {
    fontSize: 20,
    textTransform: 'uppercase',
    backgroundColor: '#ffff',
    borderTopRightRadius: 58,
    borderTopLeftRadius: 58,
    marginTop: 91,
    marginLeft: 38,
    width: 380,
    height: '100%',
    padding: 35,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  titulo: {
    color: '#1C2120',
    fontSize: 40,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
    color: '#1C2120',
  },
  textEnviar: {
    color: '#38B6FF',
    marginLeft: 18,
    fontSize: 14.5,
    marginBottom: 12,
  },
  enviarButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  successMessage: {
    color: 'green',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TrocarSenha;
