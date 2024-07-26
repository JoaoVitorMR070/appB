import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import firebase from '../firebase'; // Importe a configuração do Firebase
export default function Username() {
    const [userName, setUserName] = useState(null); // Estado para armazenar o nome do usuário

    useEffect(() => {
        // Função para obter informações do usuário atualmente logado
        const getUserInfo = async () => {
          try {
            const user = firebase.auth().currentUser;
            if (user) {
              const userId = user.uid;
              const userRef = firebase.database().ref(`users/${userId}/nome`);
              userRef.once('value', (snapshot) => {
                const nome = snapshot.val();
                setUserName(nome || 'Nome do Usuário');
              });
            }
          } catch (error) {
            console.error('Erro ao obter informações do usuário:', error.message);
          }
        };
    
        getUserInfo(); // Chama a função ao montar o componente
      }, []);

  return (

        <View style={styles.userInfo}>
          <Text style={styles.nome}>{userName}</Text>
        </View>
  );
}


const styles = StyleSheet.create({
  nome: {
    color: '#1C2120',
    fontSize: 18,
    marginLeft: 10,
  },

  userInfo: {
    marginLeft: 20,
  },
});