import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

export default class BuscarScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* Container principal */}
        <View style={styles.buscar}>
          {/* Componente de busca com imagem e campo de texto */}
          <Image
            style={styles.imgP}
            source={require('../assets/pesquisar.png')}
          />
          <TextInput
            style={styles.input}
            placeholder="Buscar"
            placeholderTextColor="#7E7E7E"
          />
        </View>
      </View>
    );
  }
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 45,
  },
  buscar: {
    backgroundColor: '#F4F4F4',
    borderColor: '#1649FF',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    height: 43.6,
    marginTop:20,
  },
  imgP: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#000000',
    fontSize: 16,
  },
});
