import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import BackButton from '../../components/BackButton'
import firebase from '../../firebase';

export default function ConversasScreen() {
  const [conversas, setConversas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversas = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const userId = user.uid;
          const conversasRef = firebase.database().ref(`conversas/${userId}`);
          
          conversasRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
              const loadedConversas = Object.entries(data).map(([id, conversa]) => ({
                id,
                ...conversa
              }));
              setConversas(loadedConversas);
            } else {
              setConversas([]);
            }
            setLoading(false);
          });
        }
      } catch (error) {
        console.error('Erro ao buscar conversas:', error.message);
        setLoading(false);
      }
    };

    fetchConversas();

    return () => {
      if (firebase.auth().currentUser) {
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref(`conversas/${userId}`).off();
      }
    };
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.conversaItem}>
      <Text style={styles.conversaTitle}>{item.title}</Text>
      <Text>{item.lastMessage}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <BackButton/>
      {loading ? (
        <Text>Carregando conversas...</Text>
      ) : (
        <FlatList
          data={conversas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={{textAlign:"center",marginTop:"50%"}}>Nenhuma conversa encontrada.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  conversaItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  conversaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
