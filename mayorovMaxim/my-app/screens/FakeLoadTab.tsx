import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

type Item = { id: string; title: string };

export default function FakeLoadTab() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const id = setTimeout(() => {
      setItems([
        { id: '1', title: 'Первый пункт' },
        { id: '2', title: 'Второй пункт' },
        { id: '3', title: 'Третий пункт' },
      ]);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(id);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text style={styles.hint}>Загрузка…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <Text key={item.id} style={styles.item}>
          • {item.title}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  hint: { marginTop: 12, color: '#666' },
  item: { fontSize: 18, marginVertical: 6 },
});