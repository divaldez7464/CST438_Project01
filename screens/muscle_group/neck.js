import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function NeckScreen({ navigation }) {
  const [exercisesByMuscle, setExercisesByMuscle] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  const neckMuscles = ['neck'];

  const getNeckExercises = async () => {
    try {
      const exercises = {};
      for (const muscle of neckMuscles) {
        const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
          headers: { 'X-Api-Key': 'a+UdRTtcI7mwP3tddq5GyA==2RsJT7qm8cOUlP9o' },
        });
        const result = await response.json();
        exercises[muscle] = result;
      }
      setExercisesByMuscle(exercises);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leg exercises:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getNeckExercises();
  }, []);

  const toggleSection = (muscle) => {
    setExpandedSections((prev) => ({
      ...prev,
      [muscle]: !prev[muscle],
    }));
  };

  const handleExercisePress = (exercise) => {
    navigation.navigate('ExerciseDetail', { exercise });
  };

  const addToFavorites = (exercise) => {
    console.log('Adding to favorites:', exercise);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Neck Exercises</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView style={styles.scrollView}>
          {neckMuscles.map((muscle) => (
            <View key={muscle}>
              <TouchableOpacity 
                style={styles.muscleHeader} 
                onPress={() => toggleSection(muscle)}>
                <Text style={styles.muscleTitle}>{muscle.charAt(0).toUpperCase() + muscle.slice(1)}</Text>
                <Icon
                  name={expandedSections[muscle] ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color="#000"
                />
              </TouchableOpacity>
              {expandedSections[muscle] && exercisesByMuscle[muscle]?.map((item, index) => (
                <View key={index} style={styles.exerciseItem}>
                  <View style={styles.exerciseDetails}>
                    <Text style={styles.exerciseName}>{item.name}</Text>
                    <Text>Type: {item.type}</Text>
                    <Text>Equipment: {item.equipment}</Text>
                  </View>
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => addToFavorites(item)} style={styles.favoriteButton}>
                      <Icon name="plus" size={24} color="#007bff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleExercisePress(item)}>
                      <Text style={styles.detailButton}>Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  muscleHeader: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 5,
  },
  muscleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  exerciseItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseDetails: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 10,
  },
  detailButton: {
    fontSize: 16,
    color: '#007bff',
    marginLeft: 20,
  },
});
