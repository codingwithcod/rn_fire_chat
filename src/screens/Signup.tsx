import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import MyModal from '../components/MyModal';
import Loader from '../components/Loader';

const Signup = ({navigation}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const handleSignup = () => {
    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      cPassword.length === 0
    ) {
      setModalMsg(`All field must be required`);
      setIsModalVisible(true);
    } else if (password !== cPassword) {
      setModalMsg(`Password and Confirm Password  must  be match`);
      setIsModalVisible(true);
    } else {
      // console.log(name, email, password, cPassword);
      setIsLoaderVisible(true);
      let userId = uuid.v4();
      userId = userId.toString();

      firestore()
        .collection('users')
        .doc(userId)
        .set({
          name,
          email,
          password,
          cPassword,
          userId,
        })
        .then(res => {
          setIsLoaderVisible(false);
          console.log('--------------->>  user created');
        })
        .catch(error => {
          setIsLoaderVisible(false);
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <MyModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        modalMsg={modalMsg}
      />
      <Loader isVisible={isLoaderVisible} />
      <Text style={styles.signupText}>Signup</Text>
      <View style={styles.form}>
        <TextInput
          value={name}
          onChangeText={txt => setName(txt)}
          style={styles.input}
          placeholder="Name"
        />
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
        <TextInput
          value={cPassword}
          onChangeText={txt => setCPassword(txt)}
          style={styles.input}
          placeholder="Confirm password"
        />
      </View>
      <TouchableOpacity onPress={handleSignup} style={styles.btn}>
        <Text style={styles.btnText}>Sign up</Text>
      </TouchableOpacity>
      <View
        style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 15}}>or</Text>
        <Text
          onPress={() => navigation.goBack()}
          style={[styles.btnText, {textDecorationLine: 'underline'}]}>
          Login
        </Text>
      </View>
    </View>
  );
};

export default Signup;

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
});
