import React, { createContext, useState, useContext, useEffect } from 'react';
import firebase from '../firebase';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    const fetchFavorites = async () => {
      try {
        const snapshot = await firebase.database().ref(`/meusFavoritos/${userId}`).once('value');
        const data = snapshot.val() || {};
        const favoriteList = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setFavorites(favoriteList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const addFavorite = async (item) => {
    const userId = firebase.auth().currentUser.uid;
    try {
      await firebase.database().ref(`/meusFavoritos/${userId}/${item.id}`).set(item);
      setFavorites([...favorites, item]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFavorite = async (id) => {
    const userId = firebase.auth().currentUser.uid;
    try {
      await firebase.database().ref(`/meusFavoritos/${userId}/${id}`).remove();
      setFavorites(favorites.filter(favorite => favorite.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, loading }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoriteContext);
};
