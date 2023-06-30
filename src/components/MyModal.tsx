import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {FC, Dispatch, SetStateAction} from 'react';

interface IMyModal {
  modalMsg: string;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const MyModal: FC<IMyModal> = ({isVisible, setIsVisible, modalMsg}) => {
  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.modal}>
        <View style={styles.modalView}>
          <Text style={{fontSize: 30, textAlign: 'center'}}>{modalMsg}</Text>
          <TouchableOpacity
            onPress={() => setIsVisible(false)}
            style={[
              styles.btn,
              {
                borderColor: '#fff',
                borderWidth: 1,
                backgroundColor: '#000',
              },
            ]}>
            <Text style={{fontSize: 25}}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MyModal;

const styles = StyleSheet.create({
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
