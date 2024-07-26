import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionPresets } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import Home from '../screens/Home';
import Buscar from '../screens/buscar';
import Horarios from '../screens/Horarios';
import Perfil from '../screens/Perfil';

enableScreens();

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 13 },
        tabBarStyle: styles.footer,
        tabBarLabelPosition: 'below-icon',
        ...TransitionPresets.SlideFromRightIOS, // Configuração de transição
      }}>
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/inicio.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
          headerShown: false, 
        }}
      />
      <Tab.Screen
        name="Buscar"
        component={Buscar}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/pesquisar.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
          headerShown: false, 
        }}
      />
      <Tab.Screen
        name="Horarios"
        component={Horarios}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/horarios.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
          headerShown: false, 
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/perfil.png')}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
          headerShown: false, 
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#F4F4F4',
    borderTopWidth: 1,
    height: 60,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom:20
  },
});
