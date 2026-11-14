// se utilizo un poco de IA para destrabar unos errores que me daba por eso la estructura puede ser un poco diferente en este archivo y muy diferente en otros
import { TodoItem } from "@/components/TodoItem";
import { ThemeContext } from "@/context/ThemeContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useTodos } from "../hooks/useTodos";

import { useContext, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [text, setText] = useState("");
  const router = useRouter();
  const TypedTodoItem = TodoItem as any;
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos() as any;

  const { colorScheme, setColorScheme, theme } = useContext(
    ThemeContext,
  ) as any;
  const styles = createStyles(theme, colorScheme);

  const handlePress = (id: any) => {
    router.push(`/details/${id}` as any);
  };

  const handleAddTodo = () => {
    if (addTodo(text)) {
      setText("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Input text here"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <Pressable style={styles.button} onPress={handleAddTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() =>
          setColorScheme(colorScheme === "light" ? "dark" : "light")
        }
      >
        {colorScheme === "light" ? (
          <MaterialCommunityIcons
            name="weather-sunny"
            size={40}
            color={theme.text}
            style={styles.themeicon}
          />
        ) : (
          <MaterialCommunityIcons
            name="weather-night"
            size={40}
            color={theme.text}
            style={styles.themeicon}
          />
        )}
      </Pressable>

      <FlatList
        data={todos}
        renderItem={({ item }: { item: any }) => (
          <TypedTodoItem
            item={item}
            onToggle={toggleTodo}
            onRemove={removeTodo}
            onDetails={handlePress}
          />
        )}
        keyExtractor={(todo: any) => todo.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}

function createStyles(theme: any, colorScheme: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.background || "black",
    },
    inputContainer: {
      flexDirection: "row",
      marginBottom: 10,
      padding: 10,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
      pointerEvents: "auto",
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      fontSize: 18,
      minWidth: 0,
      borderColor: "white",
      color: "white",
    },
    button: {
      backgroundColor: "blue",
      borderRadius: 5,
      padding: 10,
    },
    buttonText: {
      color: "white",
      fontSize: 18,
    },
    themeicon: {
      alignSelf: "center",
      marginVertical: 10,
    },
  });
}
