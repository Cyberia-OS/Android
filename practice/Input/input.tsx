//импорт необходимых компонентов из react-native
import { stylesheet, textstyle } from "react-native";

//тип пропсов для компонента поля ввода
type inputprops = {
  value: string; //текущее значение в поле ввода
  onchangetext: (value: string) => void; //функция вызываемая при изменении текста
  placeholder?: string;     
  style?: textstyle;              
  onsubmitediting?: () => void; //функция вызываемая при отправке (например нажатие enter)
}

//основной компонент поля ввода текста
export default function input({
  value,
  onchangetext,
  placeholder = "введите текст", //значение по умолчанию для placeholder
  style,
  onsubmitediting
}: inputprops) {
  return (
    <textinput 
      value={value} //привязка текущего значения
      onchangetext={onchangetext} //обработчик изменения текста
      placeholder={placeholder} //текст подсказки
      style={[style, styles.base]}  
      onsubmitediting={onsubmitediting} 
    />
  )
}

//определение базовых стилей для поля ввода
const styles = stylesheet.create({
  base: {
    paddingvertical: 12, //вертикальные внутренние отступы
    paddinghorizontal: 16, //горизонтальные внутренние отступы
    backgroundcolor: "#f2f2f2", //цвет фона
    borderbottomwidth: 2, //толщина нижней границы
    bordercolor: "#222", //цвет границы
    fontsize: 16, //размер шрифта
    color: "#222", //цвет текста
  }
});