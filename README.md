<style type = "text/css">
    p->em {
        color: red;
    }
</style>

# Magic Squares
## Содержание
1. [Возможности интерфейса](#interface)
2. Консоль
    1. Полезные математические функции
    2. Методы для генерации различных наборов данных
    2. Методы для работы с векторами
    3. Методы для fmn и tfmn-функций на векторах

---

## Возможности интерфейса <span id = "interface"></span>
Интерфейс к приложению был написан в первую очередь ещё летом 2021, и с тех пор не сильно изменялся. Основная его задача - предоставлять визуализацию магических квадратов. В частности, здесь в пару кликов можно сгенерировать `5/9-dir-квадраты` и `6/9-dir-квадраты` (см. теорию).

Здесь же предоставлена ссылка на [теоретический материал](https://comgrid.ru/MagicSquare/MagicSquare.pdf), на котором построено всё приложение (или большая его часть).

<p>
<img src="./readme/1.png" 
    alt="Кнопка-ссылка на теоретическое пособие"/>
<em>Кнопка-ссылка на теоретическое пособие</em>
</p>

Перед использованием сайта, и в том числе перед прочтением этой документации, рекомендуется ознакомиться с последней главой теоретического пособия.

Далее представлено краткое описание каждой кнопки интерфейса:

#### Блок "Главное меню"
- `Задать`. На основе введённых значений *E, x, y* заполняет ячейки квадрата числами в классическом десятичном виде
- `Факторизовать`. То же, что и `задать`, но числа представляются своими факторизациями на простые множители
- `Минимизировать`. От термина "минимальный квадрат". Делит все элементы квадрата на их НОД
- `Повернуть влево`. Поворачивает текущий квадрат против часовой стрелки
- `Отразить`. Отражает текущий квадрат по вертикали
- `Повернуть вправо`. Поворачивает текущий квадрат по часовой стрелке
- `Умножить на`. Умножает каждый элемент квадрата на введённое значение

Здесь отметим, что сложность факторизации напрямую зависит от наибольшего простого делителя. Если у какого-то из элементов квадрата предположительно есть делитель больше, чем 10⁸, рекомендуется использовать для визуализации только кнопку "задать". Иначе возможно зависание приложения. В крайнем случае, проверьте в консоли, что все числа могут быть факторизованы

#### Блок "Сгенерировать dir-квадрат"
Этот блок напрямую связан с теорией.

- `Задать ACEGJ` - `Задать ACDFH` гарантированно сгенерируют 5/9 квадраты указанного вида, выставив в *E, x, y* подходящие значения, и нажав за вас кнопку `Задать` или `Факторизовать` (в зависимости от того, что вы использовали в последний раз)

- `Задать ACEFGH` и `Задать ABDFHJ` требуют определённых значений для `alpha1`, `beta1`, `alpha2`, `beta2`. Частичное решение необходимого условия может давать блок **"Решить tfmn-уравнение"**, за решениями, основанными на полном переборе, можно обратиться к методам консоли.

- Три кнопки `Обратить` меняют местами значения, введённые в инпуты, каждая на своём уровне. При этом автоматически новые значения появятся в квадрате. Для отдельных видов 5/9-квадратов это преобразование меняет местами противоположные элементы одной dir-линии, либо меняет местами две dir-линии, при этом значения в остальных клетках меняются относительно непредсказуемо.

  Хороший пример этого - знаменитый ABEHJ-квадрат (единственный известный 7/9), получаемый на значениях 9 2 3 4. В зависимости от порядка пар и чисел в парах, он может представлять собой 7/9, 6/9 и 5/9 квадрат.

![Знаменитый 7/9](./readme/2.png "Знаменитый 7/9")

- `Зарандомить` устанавливает в каждый инпут рандомное значение не больше `maxRandom`, но вы никогда не получите пару не взаимно простых `alpha` и `beta`.

#### Блок "Решить tfmn-уравнение"
Этот блок призван генерировать 6/9 квадраты

Все решения - параметрические, и принимают на вход два параметра. Подробнее - в теории. Приложение лишь реализует эти решения

`Зарандомить` и `Обратить` работают так же, как и в блоке выше