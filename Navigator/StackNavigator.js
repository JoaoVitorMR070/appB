import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";

import ConversasScreen from '../screens/TelasPerfil/conversas'
import NotificacoesScreen from '../screens/TelasPerfil/Notificações'
import PagamentosScreen from '../screens/TelasPerfil/pagamentos'
import AdicionarCartaoScreen from '../screens/TelasPerfil/AdicionarCartao'
import FavoritosScreen from '../screens/TelasPerfil/favoritos'
import CuponsScreen from '../screens/TelasPerfil/cupons'
import DadosContaScreen from '../screens/TelasPerfil/dados_da_conta'
import AjudaScreen from '../screens/TelasPerfil/ajuda'
import ConfiguracoesScreen from '../screens/TelasPerfil/configuraçoes'
import SobreScreen from '../screens/TelasPerfil/sobreApp'
import SegurancaScreen from '../screens/TelasPerfil/seguranca'

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
          initialRouteName="Início"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Início" component={TabNavigator} />
          <Stack.Screen name="ConversasScreen" component={ConversasScreen}/>
          <Stack.Screen name="NotificacoesScreen" component={NotificacoesScreen}/>
          <Stack.Screen name="PagamentosScreen" component={PagamentosScreen}/>
          <Stack.Screen name="FavoritosScreen" component={FavoritosScreen}/>
          <Stack.Screen name="CuponsScreen" component={CuponsScreen}/>
          <Stack.Screen name="DadosContaScreen" component={DadosContaScreen}/>
          <Stack.Screen name="AjudaScreen" component={AjudaScreen}/>
          <Stack.Screen name="ConfiguracoesScreen" component={ConfiguracoesScreen}/>
          <Stack.Screen name="AdicionarCartao" component={AdicionarCartaoScreen} /> 
          <Stack.Screen name="seguranca" component={SegurancaScreen} /> 
          <Stack.Screen name="sobreApp" component={SobreScreen} /> 
          
        </Stack.Navigator>
    );
};

export default StackNavigator; 
