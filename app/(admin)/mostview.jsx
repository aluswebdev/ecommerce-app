import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MostView = () => {
  return (
    <View style={styles.container}>
      <Text>Most view</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default MostView;