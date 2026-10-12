import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function CounterTab() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Счётчик</Text>
      <Text style={styles.value}>{count}</Text>

      <View style={styles.row}>
        <Pressable
          style={styles.btn}
          onPress={() => setCount((c) => Math.max(0, c - 1))}
        >
          <Text style={styles.btnText}>−</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => setCount(0)}>
          <Text style={styles.btnText}>Reset</Text>
        </Pressable>

        <Pressable
          style={styles.btn}
          onPress={() => setCount((c) => c + 1)}
        >
          <Text style={styles.btnText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: { fontSize: 20, marginBottom: 8, color: '#666' },
  value: { fontSize: 64, fontWeight: '700', marginBottom: 24 },
  row: { flexDirection: 'row', gap: 12 },
  btn: {
    backgroundColor: '#111',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});