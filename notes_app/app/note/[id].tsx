import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import useNotes from "@/hooks/use-notes";

export default function NoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { note, loadNote, updateText, deleteNote } = useNotes();
  const [text, setText] = useState("");

  useEffect(() => {
    if (id) {
      loadNote();
    }
  }, [id]);

  useEffect(() => {
    if (note) {
      setText(note.text);
    }
  }, [note]);

  const handleDelete = () => {
    const noteId = Array.isArray(id) ? id[0] : id;
    if (!noteId) return;

    Alert.alert(
      "Удалить заметку",
      "Вы уверены?",
      [
        { text: "Отмена", style: "cancel" },
        { 
          text: "Удалить", 
          style: "destructive",
          onPress: () => {
            deleteNote(noteId);
            router.push("/");
          }
        }
      ]
    );
  };

  if (!note) {
    return (
      <View style={styles.container}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Назад</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleDelete}>
          <Text style={styles.deleteButton}>Удалить</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Текст заметки..."
        multiline
        autoFocus
        onBlur={() => updateText(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    fontSize: 16,
    color: "#007AFF",
  },
  deleteButton: {
    fontSize: 16,
    color: "#ff4444",
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: "top",
  },
});