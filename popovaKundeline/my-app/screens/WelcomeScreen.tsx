import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert, TextInput } from 'react-native';

export default function WelcomeScreen() {
const [name, setName] = useState<string>('');

const handleStart = () => {
    Alert.alert('Alert!', 'Кнопка «Начать» нажата');
    console.log('Кнопка «Начать» нажата');
};

return (
    <View style={styles.container}>
    <View style={styles.content}>
        <Text style={styles.title}>
        {name.trim() ? `Добро пожаловать, ${name}!` : 'Добро пожаловать!'}
        </Text>
        <Text style={styles.subtitle}>Мобильная разработка</Text>
    </View>

    <View style={styles.inputContainer}>
        <Text style={styles.label}>Как тебя зовут?</Text>
        <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Введите имя"
        placeholderTextColor="#999"
        autoCapitalize="words"
        />
    </View>

    <Pressable style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Начать</Text>
    </Pressable>
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
},
content: {
    alignItems: 'center',
    marginBottom: 32,
},
title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 12,
},
subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
},
inputContainer: {
    width: '100%',    
    marginBottom: 32,  
},
label: {
    fontSize: 16,      
    fontWeight: '500', 
    color: '#444444',  
    marginBottom: 8,   
},
input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1a1a1a',
    backgroundColor: '#f9f9f9',
},
button: {
    backgroundColor: '#0f7378',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
},
buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
},
});
