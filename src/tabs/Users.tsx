import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [id, setId] = useState<string | null>();
  const navigation = useNavigation<any>();
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let tempData: any = [];
    const id = await AsyncStorage.getItem('USERID');
    setId(id);
    console.log('----------- id -----------', id);

    const email = await AsyncStorage.getItem('EMAIL');
    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        console.log(res.docs[0].data());
        if (res.docs.length !== 0) {
          res.docs.map(item => tempData.push(item.data()));
        }
        setAllUsers(tempData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>My Chat</Text>
      </View>
      <View style={styles.userContainer}>
        <FlatList
          data={allUsers}
          renderItem={({item, index}: {item: any; index: number}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Chat', {data: item, id})}
              style={styles.userItem}>
              <Image
                source={require('../asset/user.png')}
                style={styles.image}
              />
              <Text style={{color: 'red', fontSize: 20}}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    elevation: 10,
    padding: 5,
  },
  headerTxt: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  userContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
    width: '100%',
  },
  userItem: {
    width: '100%',
    padding: 15,
    backgroundColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    marginBottom: 10,
  },
  image: {
    height: 30,
    width: 30,
  },
});
