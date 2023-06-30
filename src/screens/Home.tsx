import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Users from '../tabs/Users';
import Settings from '../tabs/Settings';

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      {selectedTab === 0 ? <Users /> : <Settings />}

      {/* ----------------------------------------------- */}
      <View style={styles.bottomTab}>
        <TouchableOpacity
          onPress={() => setSelectedTab(0)}
          style={[styles.tab]}>
          <Image
            source={require('../asset/social.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab === 0 ? 'red' : '#ccc'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab(1)} style={styles.tab}>
          <Image
            source={require('../asset/settings.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab === 1 ? 'red' : '#ccc'},
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#000',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabIcon: {
    width: 30,
    height: 30,
  },
});
