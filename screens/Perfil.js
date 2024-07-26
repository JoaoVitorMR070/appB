import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Username from '../components/Username'

export default function PerfilScreen() {
  const navigation = useNavigation();

  // Dados para a lista de ações
  const data = [
    { id: '1', title: 'Conversas', description: 'Meus históricos de conversas', screen: 'ConversasScreen', icon: 'message-text' },
    { id: '2', title: 'Notificações', description: 'Minha central de notificações', screen: 'NotificacoesScreen', icon: 'bell' },
    { id: '3', title: 'Pagamentos', description: 'Meus saldos e cartões', screen: 'PagamentosScreen', icon: 'credit-card-outline' },
    { id: '4', title: 'Favoritos', description: 'Meus locais favoritos', screen: 'FavoritosScreen', icon: 'heart' },
    { id: '5', title: 'Cupons', description: 'Meus cupons de desconto', screen: 'CuponsScreen', icon: 'ticket-outline' },
    { id: '6', title: 'Dados da conta', description: 'Minhas informações da conta', screen: 'DadosContaScreen', icon: 'account-circle-outline' },
    { id: '7', title: 'Ajuda', description: 'Centro de ajuda', screen: 'AjudaScreen', icon: 'help-circle-outline' },
    { id: '8', title: 'Configurações', description: 'Configurações da conta', screen: 'ConfiguracoesScreen', icon: 'cog-outline' },
  ];

  // Função para renderizar cada item da lista
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(item.screen)}
      >
        <MaterialCommunityIcons
          name={item.icon}
          size={30}
          color="black"
          style={styles.icon}
        />
        <View style={styles.textB}>
          <Text style={styles.buttonText}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.userD}>
        <Username/>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  nome: {
    color: '#1C2120',
    fontSize: 18,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F5F5F5',
    borderBottomWidth: 2,
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 18,
  },
  textB: {
    marginLeft: 15,
  },
  userD: {
    alignItems: 'center',
    marginTop: 60,
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 30,
  },
  userInfo: {
    marginLeft: 20,
  },
  icon: {
    marginLeft: 15,
  },
  flatListContent: {
    paddingBottom: 15,
  },
});
