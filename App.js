
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { Button, Text, View, TextInput, StyleSheet, Alert } from 'react-native';

import Signup from './screens/Signup';
import Login from './screens/login';
import { getUserByUserName } from './DB/appDBService'
import HomePage from './screens/homepage';

import ExerciseDetailScreen from './screens/muscle_group/exerciseDetail';
import LegsScreen from './screens/muscle_group/legs';
import ChestScreen from './screens/muscle_group/chest';
import BackScreen from './screens/muscle_group/back';
import ArmsScreen from './screens/muscle_group/arms';
import AbsScreen from './screens/muscle_group/abs';
import NeckScreen from './screens/muscle_group/neck';

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


export default function App() {
  return (
    <SQLiteProvider databaseName='leFitness.db' onInit={initializeDatabase}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LoginPage">

        <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="homepage"
            component={HomePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LegsScreen"
            component={LegsScreen}
            options={{ headerShown: true, title: 'Leg Exercises' }}
          />
          <Stack.Screen
            name="ChestScreen"
            component={ChestScreen}
            options={{ headerShown: true, title: 'Chest Exercises' }}
          />
          <Stack.Screen
            name="BackScreen"
            component={BackScreen}
            options={{ headerShown: true, title: 'Back Exercises' }}
          />
          <Stack.Screen
            name="ArmsScreen"
            component={ArmsScreen}
            options={{ headerShown: true, title: 'Arm Exercises' }}
          />
          <Stack.Screen
            name="AbsScreen"
            component={AbsScreen}
            options={{ headerShown: true, title: 'Abs Exercises' }}
          />
          <Stack.Screen
            name="NeckScreen"
            component={NeckScreen}
            options={{ headerShown: true, title: 'Neck Exercises' }}
          />
          <Stack.Screen
            name="ExerciseDetail"
            component={ExerciseDetailScreen}
            options={{ headerShown: true, title: 'Exercise Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
