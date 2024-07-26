import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFavorites } from '../components/FavoriteContext';
import firebase from '../firebase';

export default function HomeScreen({ navigation }) {
  const [salaoDeBeleza, setSalaoDeBeleza] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite, loading: favoritesLoading } = useFavorites();

  useEffect(() => {
    fetchSaloesDeBeleza();
  }, []);

  const fetchSaloesDeBeleza = () => {
    firebase.database().ref('/users').once('value', snapshot => {
      const salaoDeBeleza = [];
      snapshot.forEach(childSnapshot => {
        salaoDeBeleza.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      setSalaoDeBeleza(salaoDeBeleza);
      setLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
    });
  };

  const handleFavoriteToggle = (item) => {
    if (favorites.some(fav => fav.id === item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  const renderSalaoItem = ({ item }) => {
    const isFavorited = favorites.some(fav => fav.id === item.id);

    return (
      <TouchableOpacity style={styles.anuncios}>
        <Image style={styles.img} source={{ uri: item.imgUrl }} resizeMode="cover" />
        <TouchableOpacity style={styles.favoritos} onPress={() => handleFavoriteToggle(item)}>
          <AntDesign name="heart" size={24} color={isFavorited ? 'red' : 'gray'} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ marginTop: 30 }}>
          <Text style={styles.titulo}>Beleza</Text>
          <Text style={styles.titulo}>Express</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.diviimg}>
          <Image style={styles.img} source={require('../assets/sinoA.png')} />
          <Text style={styles.notificationCount}>0</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.categori}>Categorias</Text>
        <TouchableOpacity style={styles.recomendacoes}></TouchableOpacity>
      </View>
      <Text style={styles.subTitulo}>Anuncios</Text>
      {loading || favoritesLoading ? (
        <ActivityIndicator size="large" color="blue" style={styles.loadingIndicator} />
      ) : error ? (
        <Text style={styles.errorText}>Erro: {error}</Text>
      ) : (
        <FlatList
          data={salaoDeBeleza}
          renderItem={renderSalaoItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.anunciosContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    color: '#1C2120',
    textAlign: 'center',
    fontSize: 35,
  },
  img: {
    borderRadius: 20,
    width: 38.8,
    height: 42.6,
  },
  diviimg: {
    alignItems: 'center',
  },
  notificationCount: {
    marginTop: -40,
    marginLeft: -15,
    color: '#EFEFEF',
  },
  categori: {
    color: '#000000',
    fontSize: 20,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  recomendacoes: {
    backgroundColor: '#242424',
    alignSelf: 'center',
    width: 346.1,
    borderRadius: 20,
    marginTop: 17,
    height: 115.3,
    padding: 10,
  },
  subTitulo: {
    color: '#1C2120',
    fontSize: 20,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  anunciosContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  anuncios: {
    backgroundColor: '#242424',
    width: 155.7,
    height: 135,
    borderRadius: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
    shadowColor: '#F4F4F4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  favoritos: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
