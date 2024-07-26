import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from 'react-native';
import firebase from './firebase';

import LoginScreen from "./screens/telasLogin/login";
import Criarconta from './screens/telasLogin/registro';
import ForgotPasswordScreen from './screens/telasLogin/recuperasenha'; 
import StackNavigator from "./Navigator/StackNavigator";
import SobreScreen from './screens/TelasPerfil/sobreApp'
import SegurancaScreen from "./screens/TelasPerfil/seguranca";
import { FavoriteProvider } from './components/FavoriteContext';

import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();



const Stack = createStackNavigator();

const StackNav = ({ user }) => {
  return (
  <FavoriteProvider>
    <Stack.Navigator 
      initialRouteName={user ? "Main" : "Login"} 
      screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="criarconta" component={Criarconta} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Sobre" component={SobreScreen} />
      <Stack.Screen name="Seguranca" component={SegurancaScreen} />
      <Stack.Screen name="Main" component={StackNavigator} />
    </Stack.Navigator>
  </FavoriteProvider>
  );
}

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StackNav user={user} />
    </NavigationContainer>
  );
}
