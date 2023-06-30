import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';
import React, {FC} from 'react';

interface IMyModal {
  isVisible: boolean;
}

const Loader: FC<IMyModal> = ({isVisible}) => {
  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.modal}>
        <View style={styles.modalView}>
          <ActivityIndicator size={70} color="#fff" />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    // backgroundColor: '#ccc',
    padding: 10,
    paddingBottom: 20,
    width: '70%',
    alignItems: 'center',
    borderRadius: 10,
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
});
