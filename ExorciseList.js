import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TextInput, Button } from 'react-native';

const ExorciseList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [muscle, setMuscle] = useState('');
    const [equipment, setEquipment] = useState('');

    const addWorkout = () => {
        const newWorkout = { id: String(workouts.length + 1), name, type, muscle, equipment };
        setWorkouts([...workouts, newWorkout]);
        setName('');
        setType('');
        setMuscle('');
        setEquipment('');
    };

    const clearWorkouts = () => {
        setWorkouts([]); 
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.label}>Type:</Text>
                <Text style={styles.label}>Muscle:</Text>
                <Text style={styles.label}>Equipment:</Text>
            </View>
            <View style={styles.dataContainer}>
                <Text style={styles.data}>{item.name}</Text>
                <Text style={styles.data}>{item.type}</Text>
                <Text style={styles.data}>{item.muscle}</Text>
                <Text style={styles.data}>{item.equipment}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.mainHeader}>Welcome to Lefitness</Text>
            <Text style={styles.header}>Exorcise List</Text>
            <FlatList
                data={workouts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
            />
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
                <TextInput style={styles.input} placeholder="Type" value={type} onChangeText={setType} />
                <TextInput style={styles.input} placeholder="Muscle" value={muscle} onChangeText={setMuscle} />
                <TextInput style={styles.input} placeholder="Equipment" value={equipment} onChangeText={setEquipment} />
                <Button title="Add Workout" onPress={addWorkout} />
                <View style={styles.buttonSpacer} />
                <Button title="Clear All Workouts" onPress={clearWorkouts} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    mainHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    list: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 8,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
    },
    labelContainer: {
        marginRight: 10,
        width: 100,
    },
    dataContainer: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    data: {
        fontSize: 16,
        marginBottom: 4,
    },
    inputContainer: {
        padding: 10,
    },
    input: {
        height: 40,
        marginBottom: 8,
        borderWidth: 1,
        padding: 10,
    },
    buttonSpacer: {
        marginTop: 10, 
    },
});

export default ExorciseList;
