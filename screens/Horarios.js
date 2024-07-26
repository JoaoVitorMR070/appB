import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class HorariosScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Meus Horários</Text>
        </View>

        {/* Conteúdo */}
        <View style={styles.content}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Agendar novamente</Text>
          </TouchableOpacity>
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
  },
  header: {
    backgroundColor: '#F5F5F5',
    width: '100%',
    height: 200.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    color: '#1C2120',
    fontSize: 20,
    padding: 40,
  },
  content: {
    alignItems: 'center',
    marginTop: 100,
  },
  button: {
    backgroundColor: '#EA0033',
    width: '80%',
    height: 47.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: '#F4F4F4',
    borderWidth: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
