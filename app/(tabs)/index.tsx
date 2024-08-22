import { Image, StyleSheet } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/todolist.png')}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">To do list</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Étape 1 : Ajouter une tâche</ThemedText>
        <ThemedText>
          Appuyez sur l'onglet <ThemedText type="defaultSemiBold">"Add"</ThemedText> pour créer une nouvelle tâche.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Étape 2 : Gérer les tâches</ThemedText>
        <ThemedText>
          Appuyez sur l'onglet <ThemedText type="defaultSemiBold">"Todo"</ThemedText> pour voir vos tâches.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Étape 3 : Conservez vos tâches</ThemedText>
        <ThemedText>
         Grâce à <ThemedText type="defaultSemiBold">AsyncStorage</ThemedText>, conservez vos tâches ! (Appuyez sur R dans le terminal ou rechargez la page pour voir la nouvelle tâche)
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
