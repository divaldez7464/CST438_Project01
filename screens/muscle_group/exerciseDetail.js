import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';

export default function ExerciseDetailScreen({ route, navigation }) {
  const { exercise } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.label}>Type: <Text style={styles.value}>{exercise.type}</Text></Text>
        <Text style={styles.label}>Muscle: <Text style={styles.value}>{exercise.muscle}</Text></Text>
        <Text style={styles.label}>Equipment: <Text style={styles.value}>{exercise.equipment}</Text></Text>
        <Text style={styles.label}>Difficulty: <Text style={styles.value}>{exercise.difficulty}</Text></Text>
        <Text style={styles.label}>Instructions:</Text>
        <Text style={styles.instructions}>{exercise.instructions}</Text>
      </ScrollView>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flexGrow: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    fontWeight: 'normal',
  },
  instructions: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 22,
  },
});
