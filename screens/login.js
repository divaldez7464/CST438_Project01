import React from 'react';
import { Button, View, Text } from 'react-native';

export default function Login({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Text>This is where our login screen</Text>
      <Button
        title="This leads us to our homepage"
        onPress={() => navigation.navigate('homepage')}
      />
    </View>
  );
}
