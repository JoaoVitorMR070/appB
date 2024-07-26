import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../firebase';

export default class CriaConta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      sobrenome: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: null,
    };
  }

  registerUser = () => {
    const { email, password, confirmPassword, nome, sobrenome, image } = this.state;

    if (password === confirmPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          if (image) {
            this.uploadImage(userCredential.user.uid, image);
          }

          firebase.database().ref("/users/" + userCredential.user.uid)
            .set({
              email: userCredential.user.email,
              nome: nome,
              sobrenome: sobrenome,
              current_theme: "dark",
              profilePicture: userCredential.user.uid + "/profile.jpg",
            })
            .then(() => {
              Alert.alert("Usuário registrado!");
              console.log(userCredential.user.uid);
              this.props.navigation.replace("Login");
            })
            .catch(error => {
              Alert.alert("Erro ao salvar informações do usuário:", error.message);
            });
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    } else {
      Alert.alert("As senhas não são iguais");
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  uploadImage = async (userId, uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child(userId + "/profile.jpg");

    return ref.put(blob);
  };

  render() {
    const { email, password, confirmPassword, nome, sobrenome, image } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.arealogin}>
          <View style={styles.login}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => this.props.navigation.navigate('Login')}>
              <FontAwesome name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.form}>
              <Text style={styles.titulo}>Crie uma Conta</Text>

              <Text style={styles.textinpu}>NOME</Text>
              <TextInput
                style={styles.logininput}
                onChangeText={text => this.setState({ nome: text })}
                placeholder="Jiara"
              />

              <Text style={styles.textinpu}>SOBRENOME</Text>
              <TextInput
                style={styles.logininput}
                onChangeText={text => this.setState({ sobrenome: text })}
                placeholder="Martins"
              />

              <Text style={styles.textinpu}>EMAIL</Text>
              <TextInput
                style={styles.logininput}
                onChangeText={text => this.setState({ email: text })}
                placeholder="seu email"
              />

              <Text style={styles.textinpu}>SENHA</Text>
              <TextInput
                style={styles.logininput}
                onChangeText={text => this.setState({ password: text })}
                placeholder="Digite sua senha"
              />

              <Text style={styles.textinpu}>CONFIRME A SENHA</Text>
              <TextInput
                style={styles.logininput}
                onChangeText={text => this.setState({ confirmPassword: text })}
                placeholder="Digite sua senha novamente"
              />

              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 100 }} />}
              <TouchableOpacity style={styles.uploadButton} onPress={this.pickImage}>
                <FontAwesome name="upload" size={24} color="white" />
                <Text style={styles.uploadText}>Upload Foto</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButon}
                onPress={() => this.registerUser()}
              >
                <Text style={styles.texButon}>Sign up</Text>
              </TouchableOpacity>


              <TouchableOpacity
                onPress={() => this.props.navigation.replace("Login")}
              >
              </TouchableOpacity>
                <Text style={styles.buttonTextNewUser}>Login</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C2120',
    width: '100%',
    height: '100%',
    padding: 35,
  },
  arealogin: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  login: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1C2120',
    borderRadius: 10,
    width: 355,
    height: 720,
    padding: 45,
  },
  logininput: {
    backgroundColor: '#D4D4D4',
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center',
    outline: 'none',
    width: 276.3,
    marginTop: 10,
    height: 45,
    borderRadius: 17,
  },
  textinpu: {
    color: '#8F8E8E',
    marginLeft: 18,
    fontSize: 10.5,
  },
  texButon: {
    color: '#ffff',
    textAlign: 'center',
    fontSize: 17,
  },
  loginButon: {
    backgroundColor: 'black',
    marginTop: 17,
    width: 254.2,
    alignSelf: 'center',
    height: 44.4,
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  form: {
    display: 'block',
    fontSize: 20,
    textTransform: 'uppercase',
    backgroundColor: '#ffff',
    borderTopRightRadius: 58,
    borderTopLeftRadius: 58,
    marginTop: 60,
    marginLeft: 38,
    width: 380,
    height: '150%',
    padding: 35,
  },
  titulo: {
    color: '#1C2120',
    fontSize: 40,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  buttonTextNewUser: {
    textAlign: 'center',
    color: "black",
    textDecorationLine: 'underline'
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    marginTop: 17,
    width: 254.2,
    alignSelf: 'center',
    height: 44.4,
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  uploadText: {
    color: 'white',
    marginLeft: 10,
  },
});
