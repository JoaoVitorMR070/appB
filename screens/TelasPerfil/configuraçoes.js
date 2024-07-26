import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import BackButton from '../../components/BackButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../firebase';

export default function ConfiguracoesScreen() {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao sair:', error.message);
    }
  };

  const navigateSobreoApp = () => {
    navigation.navigate('Sobre');
  };
  const navigateAjuda = () => {
    navigation.navigate('AjudaScreen');
  };
  const navigateFormasDePagamento = () => {
    navigation.navigate('PagamentosScreen');
  };
  const navigateSeguranca = () => {
    navigation.navigate('Seguranca');
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Configurações</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notificações</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('DadosConta')}>
        <Text style={styles.settingText}>Editar Perfil</Text>
        <MaterialCommunityIcons name="chevron-right" size={25} color="#4F4F4F" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={navigateFormasDePagamento}>
        <Text style={styles.settingText}>Formas de Pagamento</Text>
        <MaterialCommunityIcons name="chevron-right" size={25} color="#4F4F4F" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={navigateSeguranca}>
        <Text style={styles.settingText}>Segurança</Text>
        <MaterialCommunityIcons name="chevron-right" size={25} color="#4F4F4F" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={navigateAjuda}>
        <Text style={styles.settingText}>Ajuda</Text>
        <MaterialCommunityIcons name="chevron-right" size={25} color="#4F4F4F" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={navigateSobreoApp}>
        <Text style={styles.settingText}>Sobre o App</Text>
        <MaterialCommunityIcons name="chevron-right" size={25} color="#4F4F4F" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair da Conta</Text>
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
    marginTop: 80,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingText: {
    fontSize: 18,
    color: '#4F4F4F',
  },
  logoutButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
