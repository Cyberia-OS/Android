import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import useNotes from "@/hooks/use-notes";

export default function NotesList() {
  const router = useRouter();
  const { notes, loadNotes, createNote, deleteNote } = useNotes();

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Мои заметки</Text>
        <TouchableOpacity onPress={createNote}>
          <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.noteItem}
            onPress={() => router.push(`/note/${item.id}`)}
          >
            <View style={styles.noteContent}>
              <Text numberOfLines={2} style={styles.noteText}>
                {item.text || "Пустая заметка"}
              </Text>
              <Text style={styles.noteDate}>
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => deleteNote(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteText}>×</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Нет заметок</Text>
            <TouchableOpacity onPress={createNote}>
              <Text style={styles.createText}>Создать первую</Text>
            </TouchableOpacity>
          </View>
        }
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    fontSize: 32,
    color: "#007AFF",
  },
  noteItem: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  noteContent: {
    flex: 1,
  },
  noteText: {
    fontSize: 16,
    marginBottom: 4,
  },
  noteDate: {
    fontSize: 12,
    color: "#666",
  },
  deleteButton: {
    marginLeft: 12,
    backgroundColor: "#ff4444",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    marginBottom: 12,
  },
  createText: {
    color: "#007AFF",
    fontSize: 16,
  },
});