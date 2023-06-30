import {
  StyleSheet,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import MyModal from '../components/MyModal';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email.length === 0 || password.length === 0) {
      setModalMsg(`All field must be required`);
      setIsModalVisible(true);
    } else {
      setIsLoaderVisible(true);
      firestore()
        .collection('users')
        .where('email', '==', email)
        .get()
        .then(res => {
          if (res.docs[0].data()) {
            handleSaveInfo(
              res.docs[0].data().name,
              res.docs[0].data().email,
              res.docs[0].data().userId,
            );
          }
          setIsLoaderVisible(false);

          console.log(JSON.stringify(res.docs[0].data()));
        })
        .catch(error => {
          setIsLoaderVisible(false);
          console.log(error);
          setModalMsg('User not found');
          setIsModalVisible(true);
        });
    }
  };

  const handleSaveInfo = async (
    name: string,
    email: string,
    userId: string,
  ) => {
    await AsyncStorage.setItem('NAME', name);
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('USERID', userId);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <MyModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        modalMsg={modalMsg}
      />
      <Loader isVisible={isLoaderVisible} />

      <Text style={styles.signupText}>Login </Text>
      <View style={styles.form}>
        <TextInput
          value={email}
          onChangeText={txt => setEmail(txt.toLowerCase())}
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          value={password}
          onChangeText={txt => setPassword(txt)}
          style={styles.input}
          placeholder="Password"
        />
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.btn}>
        <Text style={styles.btnText}>Log in</Text>
      </TouchableOpacity>
      <View
        style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 15}}>or</Text>
        <Text
          onPress={() => navigation.navigate('Signup')}
          style={[styles.btnText, {textDecorationLine: 'underline'}]}>
          Signup
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  signupText: {
    marginTop: 55,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  form: {
    width: '90%',
    marginTop: 50,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 20,
  },
  input: {
    borderWidth: 0.5,
    padding: 10,
    paddingLeft: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    fontSize: 20,
    marginVertical: 10,
  },
  btn: {
    color: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    width: '90%',
    marginTop: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#ccc',
    padding: 10,
    paddingBottom: 20,
    width: '70%',
    alignItems: 'center',
    borderRadius: 10,
  },
});
