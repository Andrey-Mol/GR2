import StickRegime from "../entities/StickRegime";

/** Режимы работы линий */
const stickRegimes = {
  standart: new StickRegime("#ff0202", 3, null), // Стандартный
  backlit: new StickRegime("#b23333", 3, null), // Подсвеченная (при наведении)
  addedPointFrame: new StickRegime("#dca1a1", 2, []), // У рамки при добавлении точки
  turningAxes: new StickRegime("#2bd5bc", 3, null), // У оси при вращении
  mirror: new StickRegime("#b855c5", 2, null), // У рамки при трансформировании
  frontX: new StickRegime("#ffdb00", 2, null), // Передний у оси X
  frontY: new StickRegime("#00ff00", 2, null), // Передний у оси Y
  frontZ: new StickRegime("#0020ff", 2, null), // Передний у оси Z
  backX: new StickRegime("#c9aa38", 2, [10, 3]), // Задний у оси X
  backY: new StickRegime("#7ece45", 2, [10, 3]), // Задний у оси Y
  backZ: new StickRegime("#3b4abd", 2, [10, 3]), // Задний у оси Z
};

export default stickRegimes;
