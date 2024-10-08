
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { StyleSheet, Text, View,Alert, TextInput, Button, Image, Dimensions } from 'react-native';

import HomePage from './homepage';
import { getUserByUserName } from '../DB/appDBService';

const { width, height } = Dimensions.get('window');

export default function Login({ navigation }) {
  const [username, setUsername] = useState(''); // Input state for username
  const [password, setPassword] = useState(''); // Input state for password
  const db = useSQLiteContext();

  // Function to handle login
  const handleLogin = async () => {
    if (username === '' || password === '') {
//      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    try {
      // Fetch the user from the database using the entered username
      const user = await getUserByUserName(db, username);
      if (user) {
        // Check if the entered password matches the user's password in the database
        if (user.password === password) {
          Alert.alert('Success', 'Login successful');
          navigation.navigate('homepage',{user: user});  // Navigate to the homepage if login is successful
        } else {
          Alert.alert('Error', 'Incorrect password');
        }
      } else {
        Alert.alert('Error', 'User not found');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred during login');
    }
  };

  return (
    <View style={styles.container}>
      <Image
         source={require('../assets/leFitLogo.png')} // Replace with your logo path
         style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
<Button title="Login" onPress={handleLogin} testID="loginButton" />

      {/* Navigation to Signup Screen */}
      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
          Sign up
        </Text>
      </Text>
    </View>
  );
}

// Styling for the login screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  signupText: {
    marginTop: 20,
    textAlign: 'center',
  },
  logo: {
        alignSelf: 'center',
      width: width* 0.55,  // Increased width for bigger logo
      height: 100, // Increased height for bigger logo
      marginBottom: 20, // More space between the logo and login text
    },
  signupLink: {
    color: 'blue',
  },
});
