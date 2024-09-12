import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { getUserByUserName,addFavorites, getFavorites } from '../DB/appDBService';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

export default function HomePage({navigation, route}) {
  const [data, setData] = useState([]);
  const db = useSQLiteContext();

  const{user} = route.params;

  const getAPIData = async () => {
    try {
      var favorites = await getFavorites(db,user.user_name);
      console.log(JSON.stringify(favorites));

      var result = [];
      for(i in favorites){
        console.log(JSON.stringify(favorites[i]));
        var response = await fetch(
                'https://api.api-ninjas.com/v1/exercises?name='+favorites[i].exercise_name,
                {
                  headers: { 'X-Api-Key': 'a+UdRTtcI7mwP3tddq5GyA==2RsJT7qm8cOUlP9o' },
                }
        );
        var exercise =  await response.json();
        result.push(exercise[0])
      }
      console.log("data"+JSON.stringify(result));
      setData(JSON.parse(JSON.stringify(result)));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.exerciseItem}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <Text>Type: {item.type}</Text>
      <Text>Muscle: {item.muscle}</Text>
      <Text>Equipment: {item.equipment}</Text>
    </View>
  );

  // Categories for Explore section
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

      <Text style={styles.favoritesHeader}>{user.name}'s Favorites</Text>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>Loading...</Text>
      )}

      <Text style={styles.exploreHeader}>Explore</Text>
      <View style={styles.exploreGrid}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.exploreItem}
            onPress={() => navigation.navigate(category.screen,{user:user})} // Navigate to the respective muscle group screen
          >
            <Text style={styles.exploreText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
