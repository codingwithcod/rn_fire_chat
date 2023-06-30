import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}: any) => {
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 1000);
  }, []);

  const checkLogin = async () => {
    const id = await AsyncStorage.getItem('USERID');
    console.log('id ----------->', id);

    if (id === null) {
      navigation.replace('Login');
    } else {
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text]}>FireChat</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
