import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { primary } from '@/constants/Colors';

declare type Props = {
    title: string;
    width?: number;
    onPress: () => void;
};

export default function Button({ title, width = 100, onPress }: Props) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                { width, backgroundColor: pressed ? '#0056b3' : primary } 
            ]}
        >
            <Text style={styles.textButton}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        paddingVertical: 10, 
        borderRadius: 5, 
        justifyContent: 'center',
        alignItems: 'center', 
        elevation: 3, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    textButton: {
        color: 'white',
        fontSize: 16, 
        fontWeight: 'bold', 
        textAlign: 'center',
    }
});
