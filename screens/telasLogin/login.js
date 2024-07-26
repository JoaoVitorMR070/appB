import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import firebase from '../../firebase'; // Importa a configuração do Firebase

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      // Supondo que o nome do usuário esteja armazenado no campo displayName
      setUsername(user.displayName);
    }
  }, []);

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Navegação para a tela principal após o login
        navigation.navigate('Main');
        setUsername(user.displayName); // Atualize o nome do usuário após o login
      })
      .catch((error) => {
        Alert.alert('Erro ao fazer login', error.message);
      });
  };

  const handleSignup = () => {
    navigation.navigate('criarconta'); 
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <View style={styles.arealogin}>
        <View style={styles.login}>
          <View style={styles.diviimg}>
            <Image
              source={require('./icon.png')}
              style={styles.loginImg}
            />
          </View>
          <View style={styles.form}>
            <Text style={styles.titulo}>Login</Text>
            <Text style={styles.textinpu}>EMAIL</Text>
            <TextInput
              style={styles.logininput}
              onChangeText={setEmail}
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.textinpu}>SENHA</Text>
            <TextInput
              style={styles.logininput}
              onChangeText={setPassword}
              placeholder="Senha"
              value={password}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.loginButon}
              onPress={handleLogin}
            >
              <Text style={styles.texButon}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
            >
              <Text style={styles.texButon}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  arealogin: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  username: {
    color: '#FFFFFF',
    fontSize: 20,
    marginTop:20
  },
  titulo: {
    color: '#1C2120',
    fontSize: 40,
    textAlign: 'center',
  },
  login: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1C2120',
    borderRadius: 10,
    width: 355,
    height: 820,
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
    color: '#8F8E8E',
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
  signupButton: {
    backgroundColor: 'black',
    marginTop: 10,
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
    marginLeft: -38,
    width: 380,
    height: '100%',
    padding: 35,
  },
  loginImg: {
    borderRadius: 20,
    width: 117.8,
    height: 117.8,
  },
  diviimg: {
    marginTop: 90,
  },
  forgotPassword: {
    color: '#38B6FF',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;
