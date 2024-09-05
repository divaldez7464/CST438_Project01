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

