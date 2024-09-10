
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { Button, Text, View, TextInput, StyleSheet, Alert } from 'react-native';

import Signup from './screens/Signup';
import Login from './screens/login';
import HomePage from './screens/homepage';
import { getUserByUserName } from './DB/appDBService'

const Stack = createNativeStackNavigator();

// My way of implementing SQLite database
// source: https://docs.expo.dev/versions/latest/sdk/sqlite/
// source: https://stackoverflow.com/questions/78825618/i-get-db-execasync-error-even-though-i-am-using-expo-sqlite-latest-version
async function initializeDatabase(db) {
    try {
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS user (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              user_name TEXT NOT NULL,
              password TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS favorites (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_name TEXT NOT NULL,
              exercise_name TEXT NOT NULL,
              FOREIGN KEY(user_name) REFERENCES user(user_name)
            );
            CREATE TABLE IF NOT EXISTS logs (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_name TEXT NOT NULL,
              exercise TEXT NOT NULL,
              duration INTEGER NOT NULL,
              date TEXT NOT NULL,
              FOREIGN KEY(user_name) REFERENCES user(user_name)
            );
          `);
        console.log('Database initialised');
        const testUser = await getUserByUserName(db, 'angel'); // Pass the db instance and username
        if (testUser && testUser.length > 0) {
            const statement = await db.prepareAsync('INSERT INTO user (name, user_name, password) VALUES (?,?,?)');
            await statement.executeAsync(["angel", "angel", "angel123"]);
            console.log("test user angel added");
        }
    } catch (error) {
        console.log('Error while initializing database : ', error);
    }
}

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  const [data, setData] = useState(undefined);

  const getAPIData = async () => {
    try {
      const response = await fetch(
        'https://api.api-ninjas.com/v1/exercises',
        {
          headers: { 'X-Api-Key': 'a+UdRTtcI7mwP3tddq5GyA==2RsJT7qm8cOUlP9o' },
        }
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Welcome section */}
      <Text style={styles.welcomeText}>Welcome to LeFitness</Text>

      {/* Favorites Section */}
      <Text style={styles.favoritesHeader}>Favorites</Text>
      <ScrollView>
        {data ? (
          <View style={styles.exerciseList}>
            {data.map((item, index) => (
              <View key={index} style={styles.exerciseItem}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text>Type: {item.type}</Text>
                <Text>Muscle: {item.muscle}</Text>
                <Text>Equipment: {item.equipment}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50, // Add marginTop to push content lower
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  favoritesHeader: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  exerciseList: {
    paddingVertical: 10,
  },
  exerciseItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

