import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from 'react-native-masked-text';
import BackButton from '../../components/BackButton';
import Username from '../../components/Username';
import firebase from '../../firebase';

export default function DadosContaScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [nome, setNome] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          const userId = user.uid;
          const userRef = firebase.database().ref(`usuarios/${userId}`);

          userRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setUserData(data);
            setProfilePicture(data?.profilePicture || '');
            setTelefone(data?.telefone || '');
            setEndereco(data?.endereco || '');
            setNome(data?.nome || '');
            setLoading(false);
          });
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);



  const handleSave = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        const userId = user.uid;
        await firebase.database().ref(`usuarios/${userId}`).update({
          profilePicture,
          telefone,
          endereco,
          nome,
        });
        setIsEditing(false);
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso.');
      }
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error.message);
    }
  };

  const handleChoosePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permissão negada', 'Você precisa permitir o acesso à biblioteca de mídia para selecionar uma foto de perfil.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setProfilePicture(result.uri);
      }
    } catch (error) {
      console.error('Erro ao escolher a foto:', error.message);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta',
      'Tem certeza que deseja excluir sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: confirmDeleteAccount },
      ],
      { cancelable: false }
    );
  };

  const confirmDeleteAccount = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        const userId = user.uid;
        await firebase.database().ref(`usuarios/${userId}`).remove();
        await user.delete();
        Alert.alert('Conta Excluída', 'Sua conta foi excluída com sucesso.');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Erro ao excluir conta:', error.message);
      Alert.alert('Erro ao excluir conta', 'Ocorreu um erro ao tentar excluir sua conta. Por favor, tente novamente mais tarde.');
    }
  };






  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton />
      <TouchableOpacity style={styles.profilePictureContainer} onPress={() => isEditing && handleChoosePhoto()}>
        <View style={styles.profilePictureWrapper}>
          <Image
            source={{ uri: profilePicture || 'https://via.placeholder.com/150' }}
            style={styles.profilePicture}
          />
        </View>
        {isEditing && (
          <MaterialCommunityIcons name="camera" size={24} color="#FFFFFF" style={styles.cameraIcon} />
        )}
      </TouchableOpacity>
      <View style={styles.profileInfo}>
          <Username/>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="email" size={24} color="#1C2120" />
            <Text style={styles.infoText}>{userData?.email || 'Email não disponível'}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="phone" size={24} color="#1C2120" />
            {isEditing ? (
              <TextInputMask
                style={styles.input}
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
                placeholder="Telefone"
                value={telefone}
                onChangeText={(text) => setTelefone(text)}
              />
            ) : (
              <Text style={styles.infoText}>{telefone || 'Telefone não disponível'}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="map-marker" size={24} color="#1C2120" />
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={endereco}
                onChangeText={setEndereco}
                placeholder="Endereço"
              />
            ) : (
              <Text style={styles.infoText}>{endereco || 'Endereço não disponível'}</Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.separator}></View>
      {isEditing ? (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Excluir Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  profilePictureContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 30,
  },
  profilePictureWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    overflow: 'hidden',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1C2120',
    padding: 5,
    borderRadius: 12,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#1C2120',
    fontSize: 16,
    color: '#1C2120',
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C2120',
    marginTop: 10,
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#1C2120',
  },
  separator: {
    height: 1,
    backgroundColor: '#CED0CE',
    marginVertical: 20,
  },
  editButton: {
    backgroundColor: '#1C2120',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#1C2120',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
