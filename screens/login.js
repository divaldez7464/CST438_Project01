import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button,Text, View } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

import HomePage from './homepage';
import { getUserByUserName } from '../DB/appDBService'

export default function Login({ navigation }) {
  const [userName, setUserName] = useState('');
  const db = useSQLiteContext();

   const getUsername = async () => {
      try {
        const user = await getUserByUserName(db,'angel'); // Replace 'john123' with any dynamic value if needed
        if (user) {
          console.log(user);
          setUserName(user.user_name); // Set the retrieved username
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
   };

   // Call getUsername when the component loads or SQLiteProvider initializes
   useEffect(() => {
     getUsername(); // Fetch the username on component mount
   }, []); // Empty dependency array ensures this runs only once

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Text>This is where our login screen</Text>
      <Button
        title="This leads us to our homepage"
        onPress={() => navigation.navigate('homepage')}
      />
      <View style={{ padding: 20 }}>
                    <Text>User: {userName}</Text>
      </View>
    </View>
  );
}
