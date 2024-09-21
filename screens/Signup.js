import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';  // Use SQLite context hook
import { addUser } from '../DB/appDBService';  // Import addUser function

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setpasswordAgain] = useState('');
  const db = useSQLiteContext();  // Get SQLite context

  const handleSignup = async () => {
    if (name === '' || username === '' || password === ''|| passwordAgain === '') {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    try {
      if(password == passwordAgain){
        await addUser(db, name, username, password);  // Pass db as a parameter
        Alert.alert('Success', 'Account created successfully');
        navigation.navigate('Login');
      }else{
        Alert.alert('Error', 'Passwords Do Not Match');
      }
      // Navigate to the login screen
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'An error occurred while creating the account. Try a different Username');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
              style={styles.input}
              placeholder="Type Password Again"
              secureTextEntry
              value={passwordAgain}
              onChangeText={setpasswordAgain}
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

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
});

export default Signup;

