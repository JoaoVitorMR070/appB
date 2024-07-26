import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../firebase';
import BackButton from '../../components/BackButton';

const PagamentosScreen = () => {
  const navigation = useNavigation();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const userId = user.uid;
          const cardsRef = firebase.database().ref(`usuarios/${userId}/cartoes`);
          cardsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            const parsedData = data ? Object.entries(data).map(([key, value]) => ({ id: key, ...value })) : [];
            setCards(parsedData);
          });
        }
      } catch (error) {
        console.error('Erro ao buscar cartões:', error.message);
      }
    };

    fetchCards();
  }, []);

  const navigateToAddCard = () => {
    navigation.navigate('AdicionarCartao');
  };

  const handleDeleteCard = async (cardId) => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        const userId = user.uid;
        console.log(`Tentando remover o cartão com ID: ${cardId}`);
        await firebase.database().ref(`usuarios/${userId}/cartoes/${cardId}`).remove();
        Alert.alert('Sucesso', 'Cartão removido com sucesso.');
      }
    } catch (error) {
      console.error('Erro ao remover cartão:', error.message);
      Alert.alert('Erro', 'Erro ao remover cartão. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <BackButton/>
      <View style={styles.header}>
        <View style={styles.campoSaldo}>
          <Text style={styles.titulo}>Gastos</Text>
          <Text style={styles.subtitulos}>Gastos Do Mês</Text>
          <Text style={styles.saldo}>$0.00</Text>
        </View>
      </View>
      <View style={styles.SubHeader}>
        <Text style={styles.titulo}>Formas de Pagamentos</Text>
        <TouchableOpacity style={styles.MeioDePagamento} onPress={navigateToAddCard}>
          <Text style={styles.tituloMeioDePagamento}>Novo cartão</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => handleDeleteCard(item.id)} style={styles.deleteButton}>
              <MaterialCommunityIcons name="close-circle" size={25} color="#FF0000" />
            </TouchableOpacity>
            <Text style={styles.nomeCard}>{item.nomeTitular}</Text>
            <Text style={styles.numeroCard}>{item.numeroCartao}</Text>
            <Text style={styles.validadeCard}>{item.validade}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#F5F5F5',
    width: '100%',
    height: 280.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SubHeader: {
    width: '100%',
    height: 200,
  },
  titulo: {
    color: '#808080',
    fontSize: 20,
    padding: 0,
    marginLeft: 15,
    marginTop: 10,
  },
  subtitulos: {
    marginTop: 40,
    marginLeft: 15,
    color: '#808080',
  },
  saldo: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 20,
  },
  campoSaldo: {
    backgroundColor: '#FFFFFF',
    marginTop: 40,
    width: '90%',
    height: 150,
    borderRadius: 15,
    borderColor: '#F4F4F4',
    borderWidth: 1,
  },
  MeioDePagamento: {
    backgroundColor: '#ffff',
    borderColor: '#F4F4F4',
    width: 135,
    height: 135,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
  },
  tituloMeioDePagamento: {
    color: '#808080',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 50,
  },
  card: {
    backgroundColor: '#4F4F4F',
    marginLeft: 15,
    padding: 15,
    borderRadius: 15,
    borderColor: '#F4F4F4',
    borderWidth: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: 280,
    height:180,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  numeroCard: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  },
  nomeCard: {
    color: '#ffffff',
    fontSize: 18,
    marginTop: 5,
  },
  validadeCard: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 5,
  },
});

export default PagamentosScreen;
