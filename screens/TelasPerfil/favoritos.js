import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BackButton from '../../components/BackButton';
import { AntDesign } from '@expo/vector-icons';
import { useFavorites } from '../../components/FavoriteContext';

export default function FavoritosScreen() {
  const { favorites, removeFavorite, loading, error } = useFavorites();

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity style={styles.anuncios}>
      <Image style={styles.img} source={{ uri: item.imgUrl }} resizeMode="cover" />
      <TouchableOpacity style={styles.favoritos} onPress={() => removeFavorite(item.id)}>
        <AntDesign name="heart" size={24} color={'red'} />
      </TouchableOpacity>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.header}>Favoritos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="blue" style={styles.loadingIndicator} />
      ) : error ? (
        <Text style={styles.errorText}>Erro: {error}</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
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
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:50,
    marginBottom: 20,
  },
  anunciosContainer: {
    paddingHorizontal: 20,
  },
  anuncios: {
    backgroundColor: '#242424',
    width: 155.7,
    height: 135,
    borderRadius: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F4F4F4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  img: {
    borderRadius: 20,
    width: 100,
    height: 100,
  },
  favoritos: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    color: '#FFFFFF',
    marginTop: 5,
    textAlign: 'center',
  },
});
