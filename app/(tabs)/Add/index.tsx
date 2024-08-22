import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';

export default function AddTaskScreen() {
    const [task, setTask] = useState('');
    const router = useRouter();

    const saveTask = async () => {
        if (task.trim().length === 0) {
            Alert.alert('Erreur', 'Veuillez entrer une tâche.');
            return;
        }

        try {
            const existingTasks = await AsyncStorage.getItem('tasks');
            const tasks = existingTasks ? JSON.parse(existingTasks) : [];

            const newTask = { id: Date.now(), title: task };
            tasks.push(newTask);

            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

            setTask('');
            router.push('/Todo'); 
        } catch (e) {
            Alert.alert('Erreur', 'Impossible de sauvegarder la tâche.');
            console.error(e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Ajouter une Nouvelle Tâche</Text>
            <TextInput
                style={styles.input}
                placeholder="Nouvelle tâche"
                value={task}
                onChangeText={setTask}
            />
            <View style={styles.buttonContainer}>
                <Button title="Ajouter" onPress={saveTask} width={120} />
                <Button title="Retour" onPress={() => router.back()} width={120} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
