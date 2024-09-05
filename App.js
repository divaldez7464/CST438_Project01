import React from 'react';
import { StyleSheet, View } from 'react-native';
import SignUpScreen from './SignUpScreen'; // Adjust the path if necessary

export default function App() {
  return (
    <View style={styles.container}>
      <SignUpScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
