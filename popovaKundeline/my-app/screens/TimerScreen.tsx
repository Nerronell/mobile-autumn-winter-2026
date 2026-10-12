import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
// Импортируем хук для отслеживания фокуса вкладки
import { useIsFocused } from '@react-navigation/native'; 

export default function TimerScreen() {
const [seconds, setSeconds] = useState<number>(0);
// Новый стейт: активен ли таймер в данный момент
const [isActive, setIsActive] = useState<boolean>(true);

// Узнаем, виден ли экран прямо сейчас
const isFocused = useIsFocused();

useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    // Интервал запускается ТОЛЬКО если экран в фокусе И таймер не поставлен на паузу
    if (isFocused && isActive) {
    intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    }

    // Cleanup срабатывает каждый раз, когда меняется isFocused или isActive
    return () => {
    if (intervalId) {
        clearInterval(intervalId);
        console.log('Интервал очищен');
    }
    };
}, [isFocused, isActive]); // Добавили зависимости: эффект перезапускается при их изменении

// Переключение состояния Старт / Стоп
const toggleTimer = () => {
    setIsActive(!isActive);
};

// Сброс таймера
const handleReset = () => {
    setSeconds(0);
};

return (
    <View style={styles.container}>
    <View style={styles.card}>
        <Text style={styles.title}>Время на экране</Text>
        
        <View style={styles.timerBox}>
        <Text style={styles.timerText}>{seconds}</Text>
        <Text style={styles.unitText}>сек</Text>
        </View>

        {/* Статус для наглядности на защите */}
        <Text style={styles.statusText}>
        {!isFocused ? '⏸️ Фокус потерян (вкладка скрыта)' : isActive ? '⏱️ Таймер тикает' : '🛑 На паузе'}
        </Text>
    </View>

    <View style={styles.buttonRow}>
        {/* Кнопка Стоп / Старт */}
        <Pressable 
        style={[styles.button, isActive ? styles.stopButton : styles.startButton]} 
        onPress={toggleTimer}
        >
        <Text style={styles.buttonText}>{isActive ? 'Стоп' : 'Старт'}</Text>
        </Pressable>

        {/* Кнопка Сброс */}
        <Pressable style={[styles.button, styles.resetButton]} onPress={handleReset}>
        <Text style={styles.buttonText}>Сброс</Text>
        </Pressable>
    </View>
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
card: {
    alignItems: 'center',
    marginBottom: 40,
},
title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
},
timerBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 20,
    marginBottom: 12,
},
timerText: {
    fontSize: 64,
    fontWeight: '700',
    color: '#0f7378',
},
unitText: {
    fontSize: 20,
    color: '#666666',
    marginLeft: 8,
    fontWeight: '500',
},
statusText: {
    fontSize: 14,
    color: '#888888',
    fontStyle: 'italic',
},
buttonRow: {
    flexDirection: 'row',
    gap: 16, // Отступ между кнопками
},
button: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    minWidth: 130,
    alignItems: 'center',
},
startButton: {
    backgroundColor: '#0f7378', // Зеленый для старта
},
stopButton: {
    backgroundColor: '#d97706', // Оранжевый для паузы
},
resetButton: {
    backgroundColor: '#a32a2a', // Бордовый для сброса
},
buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
},
});
