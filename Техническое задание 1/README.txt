Способы запуска:

node index.js random - запуск программы с рандомной генерацией сетки
node index.js path "./state.json" - запуск программы, состояние сетки которой находится в json файле.

JSON файл имеет слеюдующие поля и значения:

- state - массив, в котором находятся элементы и состояния сетки.
- col - кол-во столбцов сетки
- row - кол-во строк сетки

Пример JSON файла:

{
    "state": [ 1, 1, 1, 0, 0, 0, 0, 1, 0],
    "col": 3,
    "row": 3
}