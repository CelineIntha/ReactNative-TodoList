import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Task } from '@/models/Task';
import { useFocusEffect } from '@react-navigation/native';

export default function TaskListScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState<string>('');
  const router = useRouter();

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        const parsedTasks: Task[] = JSON.parse(storedTasks);
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const deleteTask = async (id: number) => {
    try {
      const newTasks = tasks.filter(task => task.id !== id);
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
    }
  };

  const startEditingTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTaskTitle(task.title);
  };

  const saveEditedTask = async (taskId: number) => {
    try {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, title: editedTaskTitle } : task
      );
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      setEditingTaskId(null);
      setEditedTaskTitle('');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la tâche:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Liste des tâches</Text>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              {editingTaskId === item.id ? (
                <TextInput
                  style={styles.input}
                  value={editedTaskTitle}
                  onChangeText={setEditedTaskTitle}
                  onSubmitEditing={() => saveEditedTask(item.id)}
                />
              ) : (
                <Text style={styles.taskText}>{item.title}</Text>
              )}
              <View style={styles.buttonGroup}>
                {editingTaskId === item.id ? (
                  <Pressable style={styles.saveButton} onPress={() => saveEditedTask(item.id)}>
                    <Ionicons name="checkmark-outline" size={24} color="#ffffff" />
                    <Text style={styles.saveButtonText}>Enregistrer</Text>
                  </Pressable>
                ) : (
                  <>
                    <Pressable style={styles.editButton} onPress={() => startEditingTask(item)}>
                      <Ionicons name="pencil-outline" size={24} color="#ffffff" />
                      <Text style={styles.editButtonText}>Modifier</Text>
                    </Pressable>
                    <Pressable style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
                      <Ionicons name="trash-outline" size={24} color="#ffffff" />
                      <Text style={styles.deleteButtonText}>Supprimer</Text>
                    </Pressable>
                  </>
                )}
              </View>
            </View>
          )}
          keyExtractor={(item: Task) => item.id.toString()}
        />
        <Button title="Ajouter" onPress={() => router.push('/Add')} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A7EA3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    marginRight: 8,
  },
  editButtonText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  deleteButtonText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 8,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  saveButtonText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 8,
  },
});
