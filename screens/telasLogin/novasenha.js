import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';

import firebase from '../../firebase'; // Importa a configuração do Firebase

export default class SenhaNova extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.arealogin}>
          <View style={styles.login}>
            <TouchableOpacity
              style={styles.diviimg}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Image
                source={require('../assets/seta2.png')}
                style={styles.loginImg}></Image>
            </TouchableOpacity>

            <View style={styles.form}>
              <Text style={styles.titulo}>Senha Nova</Text>
              <Text style={styles.subtitle}>digite uma nova senha</Text>

              <Text style={styles.textinpu}>SENHA NOVA</Text>
              <TextInput style={styles.logininput} placeholder="SUA SENHA" />

              <TouchableOpacity style={styles.loginButon}>
                <Text style={styles.texButon}>concluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C2120',
    width: '100%',
    height: '100%',
    padding: 35,
  },
  arealogin: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  login: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1C2120',
    borderRadius: 10,
    width: 355,
    height: 720,
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
    display: 'block',
    fontSize: 20,
    textTransform: 'uppercase',

    backgroundColor: '#ffff',
    borderTopRightRadius: 58,
    borderTopLeftRadius: 58,
    marginTop: 91,
    marginLeft: 38,
    width: 380,
    height: '150%',
    padding: 35,
  },
  loginImg: {
    borderRadius: 20,
    width: 25,
    height: 25,
  },
  diviimg: {
    marginBottom: -80,
    marginLeft: -280,
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
});
