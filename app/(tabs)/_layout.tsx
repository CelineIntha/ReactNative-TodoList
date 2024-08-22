import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Accueil',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Todo"
          options={{
            title: 'Todo',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'list-circle-outline' : 'list-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Add"
          options={{
            title: 'Add',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'add-outline' : 'add-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
