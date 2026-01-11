import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoryChart = () => {
  return (
    <View style={styles.container}>
      <Text>Category Chhart</Text>
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

export default CategoryChart;