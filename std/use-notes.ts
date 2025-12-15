import { Note } from "@/types/note";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import useAsyncStorage from "./use-storage";
import { STORAGE_KEY } from "@/constants/app.constants";

export default function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { getItem, getItems, setItems } = useAsyncStorage<Note>()

  const loadNotes = async () => {
    const data = await getItems(STORAGE_KEY);
    setNotes(data);
  };

  const loadNote = async () => {
    const data = await getItem(STORAGE_KEY, "id", id);

    setNote(data);
  };

  const createNote = async () => {
    const id = Date.now().toString();
    const newNote: Note = {
        id,
        text: "",
        createdAt: Date.now(),
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    await setItems(STORAGE_KEY, updated)

    router.push(`/note/${id}`);
  }; 

  const saveNote = async (updateNote: Note) => {
    const updatedList = await updateItem(
        STORAGE_KEY,
        "id",
        id,
        () => updateNote
    );

    setNotes(updatedList);
  }

    const updateText = async (text: string) => {
    if (!note) return;

    const updated: Note = { ...note, text };
    setNote(updated);
    saveNote(updated);
};

  return {
    notes,
    note,
    createNote,
    loadNotes,
    updateText,
    loadNote
  }
}