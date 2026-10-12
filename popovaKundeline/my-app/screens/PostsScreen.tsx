import React, { useEffect, useState } from 'react';
import { 
StyleSheet, 
Text, 
View, 
FlatList, 
ActivityIndicator, 
Button, 
SafeAreaView, 
Pressable 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getPosts, Post } from '../api'; 
import { RootStackParamList } from '../App'; // Типы берутся напрямую из App.tsx

// Типизируем пропсы текущего экрана
type Props = NativeStackScreenProps<RootStackParamList, 'PostsList'>;

export default function PostsScreen({ navigation }: Props) { 
const [posts, setPosts] = useState<Post[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);

const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
    const data = await getPosts();
    setPosts(data);
    } catch (err) {
    setError(err instanceof Error ? err.message : 'Не удалось загрузить посты');
    } finally {
    setIsLoading(false);
    }
};

useEffect(() => {
    fetchPosts();
}, []);

if (isLoading) {
    return (
    <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
    );
}

if (error) {
    return (
    <View style={styles.center}>
        <Text style={styles.errorText}>Произошла ошибка:</Text>
        <Text style={styles.errorDetails}>{error}</Text>
        <Button title="Повторить" onPress={fetchPosts} />
    </View>
    );
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    });
};

return (
    <SafeAreaView style={styles.container}>
    <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <Pressable style={styles.card} onPress={() => navigation.navigate('PostView', { id: item.id })}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
            <Text style={styles.date}>{formatDate(item.created_at)}</Text>
        </Pressable>
        )}
        ListEmptyComponent={
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Постов нет</Text>
        </View>
        }
        contentContainerStyle={posts.length === 0 ? { flex: 1 } : styles.list}
    />
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
},
list: {
    padding: 16,
},
center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},
card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
},
title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
},
content: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 20,
},
date: {
    fontSize: 11,
    color: '#999999',
    textAlign: 'right',
},
errorText: {
    fontSize: 16,
    color: '#ff0000',
    marginBottom: 4,
},
errorDetails: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 16,
    textAlign: 'center',
},
emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
emptyText: {
    fontSize: 16,
    color: '#888888',
},
});
