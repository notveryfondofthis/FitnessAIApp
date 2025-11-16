import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ScheduleContent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule Screen</Text>
      <Text>Your workout planner will be here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
