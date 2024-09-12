import React from 'react';
import { StyleSheet, View } from 'react-native';
import ExorciseList from './ExorciseList'; 

export default function App() {
  return (
    <View style={styles.container}>
      <ExorciseList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', 
   },
});