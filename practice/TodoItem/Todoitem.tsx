//импорт компонентов и стилей из react-native и button
import { stylesheet } from "react-native";

//тип задачи todo
export type todo = {
  id: string;  //уникальный идентификатор
  text: string; //текст задачи
  completed: boolean; //статус выполнения
}

//для компонента задачи
type todoitemprops = { 
  item: todo;  //объект задачи
  ontoggle: (id: string) => void; //функция переключения статуса
  ondelete: (id: string) => void; //функция удаления задачи
}

//компонент отображения одной задачи
export default function todoitem({ item, ontoggle, ondelete }: todoitemprops) {
  return (
    <view style={styles.container}>
      <text
        style={[
          styles.text,
          item.completed && styles.textcompleted //зачеркнутый текст если выполнено
        ]}
      >{ item.text }</text>

      <view style={styles.bntcontainer}>
        <button
          onpress={() => ontoggle(item.id)}
          style={styles.btn}
        >
          {item.completed ?
            (<text>undone</text>) : //кнопка не выполнено если задача выполнена
            (<text>done</text>) //кнопка выполнено если задача не выполнена
          }
        </button>

        <button
          onpress={() => ondelete(item.id)}
          style={styles.btn}
        >
          <text>del</text> {/*кнопка удаления*/}
        </button>
      </view>
    </view>
  )
}

//стили компонента задачи
const styles = stylesheet.create({
  container: { 
    flexdirection: "row",
    alignitems: "center",
    paddingvertical: 12,
    paddinghorizontal: 10,
    backgroundcolor: "#fff",
    borderradius: 12,
    marginvertical: 6,
    elevation: 2, //тень для android
    shadowcolor: "#0002", //тень для ios
    shadowopacity: 0.1,
    shadowradius: 4,
    shadowoffset: { width: 0, height: 2 },
  },
  bntcontainer: { //контейнер для кнопок
    flexdirection: "row",
    gap: 10
  },
  btn: { //стили кнопок в задаче
    paddinghorizontal: 5,
    paddingvertical: 5,
    backgroundcolor: "transparent",
  },
  text: { //стиль текста задачи
    flex: 1,
    fontsize: 16,
    color: "#222",
  },
  textcompleted: { //стиль для выполненной задачи
    textdecorationline: "line-through",
    color: "#888",
  }
});