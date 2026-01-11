import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChatListScreen from '../chat';

const ChatSereen = () => {
  return (
    <View style={styles.container}>
     <ChatListScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  }
});

export default ChatSereen;