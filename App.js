// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import the screens
import Login from './screens/login';
import HomePage from './screens/homepage';

// Create a Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="homepage" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
