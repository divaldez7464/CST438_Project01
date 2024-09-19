import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners'; // Import event listener
import { getUserByUserName,addFavorites, getFavorites, deleteFavorite } from '../DB/appDBService';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { getTip} from "../DB/tips";

export default function HomePage({ navigation, route }) {
  const [data, setData] = useState([]);
  const [tip, setTip] = useState('');
  const [loading, setLoading] = useState(true);
  const db = useSQLiteContext();

  const{user} = route.params;

  const getAPIData = async () => {
    try {
      setLoading(true); // Start loading
      const favorites = await getFavorites(db, user.user_name);
      const result = [];

      for (const favorite of favorites) {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/exercises?name=${favorite.exercise_name}`,
          {
            headers: { 'X-Api-Key': 'a+UdRTtcI7mwP3tddq5GyA==2RsJT7qm8cOUlP9o' },
          }
        );
        const exercise = await response.json();
        result.push({ ...exercise[0], id: favorite.id });
      }
      setData(result);
      setLoading(false); // Stop loading
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Stop loading on error
    }
  };

useEffect(() => {
  // Fetch the initial favorites when the component mounts
  getAPIData();
  setTip(getTip);

  // Listen for the event when favorites change
  const eventListener = EventRegister.on('favoritesChanged', () => {
    console.log('Favorites have changed. Re-fetching...');
    getAPIData();  // Re-fetch the favorites
  });

  // Cleanup the event listener when the component unmounts
  return () => {
    EventRegister.rm(eventListener);  // Correctly remove the event listener
  };
}, []);


  // Function to handle delete
  const handleDelete = async (exercise_name) => {
    if (!exercise_name) {
      console.error('Error: No exercise name provided for deletion');
      return;
    }

    try {
      // Remove from the database
      await deleteFavorite(db, exercise_name);
      console.log('Favorite deleted:', exercise_name);

      setData(prevData => prevData.filter(item => item.name !== exercise_name));
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.exerciseItem}>
      <View style={styles.exerciseInfo}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text>Type: {item.type}</Text>
        <Text>Muscle: {item.muscle}</Text>
        <Text>Equipment: {item.equipment}</Text>
      </View>

      {/* Add Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.name)}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  const handleLogout = () => {

    navigation.navigate('Login');  // Navigate back to the login screen
    //we do not need any other logic for this. Since login is just sending username from page to page,
    // this will replicate login out
  };

  const categories = [
    { name: 'Legs', screen: 'LegsScreen' },
    { name: 'Chest', screen: 'ChestScreen' },
    { name: 'Back', screen: 'BackScreen' },
    { name: 'Arms', screen: 'ArmsScreen' },
    { name: 'Abs', screen: 'AbsScreen' },
    { name: 'Neck', screen: 'NeckScreen' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to LeFitness!</Text>

      <Text style={styles.tipOfDay}>Tip of the Day: {tip}</Text>

      <Text style={styles.favoritesHeader}>{user.name}'s Favorites</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>No favorites found.</Text>
      )}

      <Text style={styles.exploreHeader}>Explore</Text>
      <View style={styles.exploreGrid}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.exploreItem}
            onPress={() => navigation.navigate(category.screen, { user: user })}
          >
            <Text style={styles.exploreText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
    textAlign: 'left',
  },
  tipOfDay: {
      fontSize: 20,
      fontWeight: '500',
      marginBottom: 15,
      marginTop: 10,
      textAlign: 'left',
      fontStyle: 'italic',
      color: '#555',
  },
  favoritesHeader: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  exploreHeader: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  exploreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exploreItem: {
    width: '30%',
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  exploreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  exerciseItem: {
    flexDirection: 'row',  // Align delete button horizontally
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor: 'red',
    borderRadius: 15,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
