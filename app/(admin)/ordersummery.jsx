import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderSummery = () => {
  return (
    <View style={styles.container}>
      <Text>Order Summery</Text>
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

export default OrderSummery;