import React, {useState, useEffect, useCallback} from 'react';
import {Bubble, GiftedChat, IMessage} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import {View} from 'react-native';

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const route = useRoute();

  console.log('--------------- messages --------->', messages);

  useEffect(() => {
    const chatRef = firestore()
      .collection('chats')
      .doc(route?.params?.id + route?.params?.data?.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    // Load initial messages from Firebase
    const unsubscribe = chatRef.onSnapshot(snapshot => {
      const messageList = snapshot.docs.map(doc => {
        console.log('----------------doc ---------->', doc);

        return doc.data() as IMessage;
      });
      //   ubscriber.onSnapshot(querysnapshot => {
      //   const allmessages = querysnapshot.docs.map(item => {
      //     return {...item.data, createdAt: item.data.createdAt};
      //   });
      setMessages(messageList);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  //   const onSend = (newMessages: IMessage[]) => {
  //     setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));

  //     // Save new messages to Firebase
  //     const chatRef = firestore().collection('chats');
  //     newMessages.forEach(message => chatRef.add(message));
  //   };

  const onSend = useCallback((messages: any[]) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
      createdAt: Date.parse(msg.createdAt),
    };
    setMessages(prevMessages => GiftedChat.append(prevMessages, myMsg));

    firestore()
      .collection('chats')
      .doc('' + route.params?.id + route.params?.data?.userId)
      .collection('messages')
      .add(myMsg);
    firestore()
      .collection('chats')
      .doc('' + route.params?.data?.userId + route.params?.id)
      .collection('messages')
      .add(myMsg);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: route.params?.id,
      }}
      renderBubble={props => (
        <Bubble
          {...props}
          wrapperStyle={{
            left: {backgroundColor: '#333333'},
            right: {backgroundColor: '#007AFF'},
          }}
          textStyle={{
            left: {color: '#FFF'},
            right: {color: '#FFFFFF'},
          }}
        />
      )}
      // messagesContainerStyle={{}}
    />
  );
};

export default ChatApp;

// -----------------------------------------

// -----------------------------------------

// import React, {useEffect, useState} from 'react';
// import {View} from 'react-native';
// import {GiftedChat} from 'react-native-gifted-chat';
// import firebase from './firebase';

// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const databaseRef = firebase.database().ref('messages');
//     databaseRef.on('value', snapshot => {
//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         const messageList = Object.values(data);
//         setMessages(messageList.reverse());
//       }
//     });

//     return () => {
//       databaseRef.off();
//     };
//   }, []);

//   const onSend = (newMessages = []) => {
//     const updatedMessages = GiftedChat.append(messages, newMessages);
//     setMessages(updatedMessages);

//     const message = newMessages[0];
//     firebase
//       .database()
//       .ref('messages')
//       .push({
//         _id: message._id,
//         text: message.text,
//         createdAt: message.createdAt.getTime(),
//         user: {
//           _id: message.user._id,
//           name: message.user.name,
//         },
//       });
//   };

//   return (
//     <View style={{flex: 1}}>
//       <GiftedChat messages={messages} onSend={onSend} user={{_id: '1'}} />
//     </View>
//   );
// };

// export default ChatScreen;
