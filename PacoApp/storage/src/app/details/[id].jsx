import { ThemeContext } from "@/context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TodoDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);

  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const loadTodo = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("TodoApp");
        if (jsonValue) {
          const todos = JSON.parse(jsonValue);
          const found = todos.find((t) => t.id.toString() === id);
          setTodo(found);
        }
      } catch (e) {
        console.error("Error loading todo details:", e);
      }
    };
    loadTodo();
  }, [id]);

  if (!todo) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Cargando detalle...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>ID de la Tarea:</Text>
        <Text style={styles.value}>{todo.id}</Text>

        <Text style={styles.label}>Título:</Text>
        <Text style={styles.value}>{todo.title}</Text>

        <Text style={styles.label}>Estado:</Text>
        <Text
          style={[
            styles.value,
            todo.completed ? styles.completed : styles.pending,
          ]}
        >
          {todo.completed ? "Completada" : "Pendiente"}
        </Text>

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Volver</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function createStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.background || "black",
      padding: 20,
      justifyContent: "center",
    },
    card: {
      backgroundColor: "#1e293b",
      padding: 20,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#334155",
    },
    label: {
      color: "#94a3b8",
      fontSize: 14,
      marginBottom: 4,
      marginTop: 12,
    },
    value: {
      color: "#ffffff",
      fontSize: 18,
      fontWeight: "bold",
    },
    completed: {
      color: "#10b981",
    },
    pending: {
      color: "#f59e0b",
    },
    text: {
      color: "#ffffff",
      textAlign: "center",
      fontSize: 16,
    },
    backButton: {
      backgroundColor: "#2563eb",
      marginTop: 24,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    backButtonText: {
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: 16,
    },
  });
}
