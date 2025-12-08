//импорт типов и модулей для работы с задачами и асинхронным хранилищем
import { todo } from "@/components/todoitem/todoitem";
import asyncstorage from "@react-native-async-storage/async-storage";
import { useeffect, usestate } from "react";

//ключ для хранения задач в asyncstorage
const storage_key = "todos";

//кастомный хук
export default function usetodos() {
  //состояние для хранения списка задач
  const [ todos, settodos ] = usestate<todo[]>([]);

  //эффект для загрузки задач
  useeffect(() => {
    (async () => {
      try {
        const json = await asyncstorage.getitem(storage_key);
        if (json) settodos(json.parse(json)); //парсим и устанавливаем задачи
      } catch (e) {
        console.log("ошибка загрузки задач:", e);
      }
    })();
  }, []);

  //функция сохранения задач
  const savetodos = async (newtodos: todo[]) => {
    settodos(newtodos); //обновляем локальное состояние
    try {
      await asyncstorage.setitem(storage_key, json.stringify(newtodos)); //сохраняем в хранилище
    } catch (e) {
      console.log("ошибка сохранения задач:", e);
    }
  };

  //функция добавления новой задачи
  const addtodo = (text: string) => {
    if (!text.trim()) return; 
    const newtodo: todo = {
      id: date.now().tostring(), //генерируем id на основе текущего времени
      text,
      completed: false, //новая задача не выполнена по умолчанию
    };
    savetodos([...todos, newtodo]); //добавляем задачу в список и сохраняем
  };

  //функция удаления задачи по id
  const deletetodo = (id: string) => {
    savetodos(todos.filter(t => t.id !== id));
  };

  //функция переключения статуса выполнения задачи
  const toggletodo = (id: string) => {
    savetodos(
      todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t 
      )
    );
  };

  //функция очистки всех выполненных задач
  const clearcompleted = () => {
    savetodos(todos.filter(t => !t.completed)); //оставляем только невыполненные задачи
  };

  return {
    todos,
    addtodo,
    deletetodo,
    toggletodo,
    clearcompleted
  }
}