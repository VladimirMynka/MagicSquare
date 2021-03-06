# Magic Squares
## Содержание
1. [Возможности интерфейса](#interface)
   1. [Блок "Главное меню"](#main-menu)
   2. [Блок "Сгенерировать dir-квадрат"](#generate-dir-square)
   3. [Блок "Решить tfmn-уравнение"](#resolve-tfmn-equation)
2. [Консоль](#console)
    1. [Полезные математические функции](#useful-math)
    2. [Методы для генерации различных наборов данных](#generate)
    3. Методы для работы с векторами
    4. Методы для fmn и tfmn-функций на векторах
    5. Методы для взлома RSA (история о том, как они сюда попали, 
   выходит за рамки этой документации)

---

## Возможности интерфейса <span id = "interface"></span>
Интерфейс к приложению был написан в первую очередь ещё летом 2021, 
и с тех пор не сильно изменялся. Основная его задача - предоставлять 
визуализацию магических квадратов. В частности, здесь в пару кликов 
можно сгенерировать `5/9-dir-квадраты` и `6/9-dir-квадраты` (см. теорию).

Здесь же предоставлена ссылка на [теоретический материал](https://comgrid.ru/MagicSquare/MagicSquare.pdf), на котором построено всё приложение (или большая его часть).

<p style="width: 100%; text-align: center">
<img src="./readme/1.png" 
    alt="Кнопка-ссылка на теоретическое пособие"/>
<em>Кнопка-ссылка на теоретическое пособие</em>
</p>

Перед использованием сайта, и в том числе перед прочтением этой 
документации, рекомендуется ознакомиться с последней главой теоретического пособия.

Далее представлено краткое описание каждой кнопки интерфейса:

#### Блок "Главное меню" <span id = "main-menu"></span>
- `Задать`. На основе введённых значений *E, x, y* заполняет ячейки 
квадрата числами в классическом десятичном виде
- `Факторизовать`. То же, что и `задать`, но числа представляются 
своими факторизациями на простые множители
- `Минимизировать`. От термина "минимальный квадрат". Делит все элементы квадрата на их НОД
- `Повернуть влево`. Поворачивает текущий квадрат против часовой стрелки
- `Отразить`. Отражает текущий квадрат по вертикали
- `Повернуть вправо`. Поворачивает текущий квадрат по часовой стрелке
- `Умножить на`. Умножает каждый элемент квадрата на введённое значение

Здесь отметим, что сложность факторизации напрямую зависит от 
наибольшего простого делителя. Если у какого-то из элементов квадрата 
предположительно есть делитель больше, чем 10⁸, рекомендуется 
использовать для визуализации только кнопку "задать". Иначе возможно 
зависание приложения. В крайнем случае, проверьте в консоли, что все числа 
могут быть факторизованы.

#### Блок "Сгенерировать dir-квадрат" <span id = "generate-dir-square"></span>
Этот блок напрямую связан с теорией.

- `Задать ACEGJ` - `Задать ACDFH` гарантированно сгенерируют 5/9 квадраты 
указанного вида, выставив в *E, x, y* подходящие значения, и нажав за вас 
кнопку `Задать` или `Факторизовать` (в зависимости от того, что вы 
использовали в последний раз)

- `Задать ACEFGH` и `Задать ABDFHJ` требуют определённых значений для 
`alpha1`, `beta1`, `alpha2`, `beta2`. Частичное решение необходимого условия 
может давать блок **"Решить tfmn-уравнение"**, за решениями, основанными на 
полном переборе, можно обратиться к методам консоли.

- Три кнопки `Обратить` меняют местами значения, введённые в инпуты, 
каждая на своём уровне. При этом автоматически новые значения появятся в квадрате. 
Для отдельных видов 5/9-квадратов это преобразование меняет местами противоположные 
элементы одной dir-линии, либо меняет местами две dir-линии, при этом значения в 
остальных клетках меняются относительно непредсказуемо.

  Хороший пример этого – знаменитый ABEHJ-квадрат (единственный известный 7/9), 
получаемый на значениях 9 2 3 4. В зависимости от порядка пар и чисел в парах, 
он может представлять собой 7/9, 6/9 и 5/9 квадрат.

<p style="width: 100%; text-align: center">
<img width="75%" src="./readme/2.png" 
    alt="Знаменитый 7/9"/> <br>
<em>Знаменитый 7/9</em>
</p>

- `Зарандомить` устанавливает в каждый инпут рандомное значение не больше `maxRandom`, 
но вы никогда не получите пару не взаимно простых `alpha` и `beta`.

#### Блок "Решить tfmn-уравнение" <span id = "resolve-tfmn-equation"></span>
Этот блок призван генерировать 6/9 квадраты

Все решения – параметрические, и принимают на вход два параметра. 
Подробнее – в теории. Приложение лишь реализует эти решения.

`Зарандомить` и `Обратить` работают так же, как и в блоке выше.

---
## Консоль <span id = "interface"></span>
Несмотря на то, что изначально система создавалась для визуализации определённых видов квадратов, 
и в этой роли она действительно оказалась полезной, в последующем
при исследовании я столкнулся с необходимостью решать кодом несколько
более сложные задачи, визуализация которых, при этом, не так важна.

Для этого я не стал далеко ходить, и просто написал весь необходимый
код в том же проекте. JavaScript-код исполняется прямо в браузерной
консоли, все написанные методы к странице доступны для вызова. Мудрые
и другие люди скажут, что Python - тоже исполняемый язык, есть возможность 
также легко использовать методы для него. Однако так сложилось, что
весь код по текущей задаче, по крайней мере, от меня, написан на js.

Как его использовать? Для этого на странице приложения используйте комбинацию клавиш 
ctrl+shift+I (для браузера Google Chrome), либо кликните правой 
кнопкой мыши и выберите "инструменты разработчика". В открывшемся
меню выберите вкладку Console. Для примера, введите Factorization(147).

<p style="width: 100%; text-align: center">
<img src="./readme/3.png" 
    alt="Браузерная консоль"/>
<em>Браузерная консоль</em>
</p>

Надеюсь, однако, что человек, читающий это пособие, имеет базовые 
знания в программировании, а также способен самостоятельно решить
все возникающие технические трудности. Далее в этой документации
будет представлено лишь описание функций, реализованных для использования.

Встроенные функции js также не будут здесь рассмотрены.

К функциям, где сложность, потенциально, важна, она указывается примерно.
Не исключено, что я упустил в процессе оценки важную деталь или не учёл
сложность работы с `BigInt`.

### Полезные математические функции <span id = "useful-math"></span>
- ```typescript
  Math.gcd(...args: number[] | BigInt[]): number | BigInt
Принимает любое количество параметров типа `number` или `BigInt`, 
возвращает их наибольший общий делитель.

НОД считается алгоритмом Евклида. В зависимости от типа данных,
сложность выражается либо _**O(log(n))**_, либо _**O(log²(n))**_ для 
двух параметров, где n - больший из них. Если параметров больше,
функция последовательно вызывает саму себя для текущего значения
НОД и следующего параметра. То есть по правилу, 
`gcd(a, b, c, d) = gcd(gcd(gcd(a, b), c), d)`

- ```typescript
  function factorization(n: number | BigInt): string
Принимает число, возвращает его факторизацию в виде строки

- ```typescript
  function findMinFactor(n: number | BigInt | string, lastFactor: number | BigInt | string): BigInt
Возвращает наименьший множитель числа _n_, больше, чем _lastFactor_. Приводит все входящие
значения к `BigInt`

Сложность алгоритма - **_O((p - lastFactor)log(n))_** для не простых _n_, 
**_O(sqrt(n)log(n))_** – для простых. _p_ – наименьший простой делитель _n_

- ```typescript
  function findMinFactorNotBigInt(n: number, lastFactor: number): number
Метод такой же, как `findMinFactor`, но работающий только с типом `number`

Сложность алгоритма - **_O((p - lastFactor))_** для не простых _n_,
**_O(sqrt(n))_** – для простых. _p_ – наименьший простой делитель _n_

- ```typescript
  function findMeanForTfmnMinFactor(n: number | BigInt | string, lastFactor: number | BigInt | string): BigInt
Работает так же, как и `findMinFactor`, но если не находит делителя _n_ меньше, чем _n^1/4_,
возвращает _n_

Сложность алгоритма - **_O((p - lastFactor))_** если p найдено,
**_O(n^1/4)_** – если нет. _p_ – наименьший простой делитель n

Примечание: несмотря на название, метод не может быть использован для расчёта tfmn-функции.
Существуют ситуации, когда n делится на квадрат, натурального и не имеет при этом простых
множителей меньше, чем _n^1/4_

- ```typescript
  function reduce(n: number | BigInt | string, k: number | BigInt | string): BigInt
Делит _n_ на _k_ до тех пор, пока _n_ делится на _k_. Приводит все входные 
параметры к `BigInt`

- ```typescript
  function getPowerIn(n: number | BigInt | string, k: number | BigInt | string): BigInt
Находит, сколько раз можно поделить _n_ на _k_. Приводит всё к `BigInt`

- ```typescript
  function makeSuperscript(n: number | string | BigInt): string
Приводит _n_ к `BigInt`, полученное число превращает в строку надстрочного текста
  
- ```typescript
   function fmn(a: number | BigInt, b: number | BigInt): number | BigInt
Считает значение _f(a,b)_ (см. теорию). Возвращает значение того же типа, 
что и введённые аргументы

- ```typescript
  function squareSumSquares(a: number | BigInt, b: number | BigInt): number | BigInt
Возвращает _(a² + b²)²_ того же типа, что и _a_ и _b_

- ```typescript
  function isSquare(n: number | string | BigInt): boolean
Проверяет, является ли _n_ полным квадратом. В процессе приводит его к `BigInt`. Сложность
_**O(log²(n))**_

- ```typescript
  function getPrimeDividers(n: number | string | BigInt): BigInt[]
Получает список простых делителей числа _n_. Сложность примерно _**O(sqrt(p)log(n))**_, 
где _p_ - наибольший простой делитель числа _n_

- ```typescript
  function getPrimeDividersNotBigint(n: number): number[]
Работает так же, как и `getPrimeDividers`, но только с типом `number`

- ```typescript
  function getFactorization(n: number | string | BigInt): BigInt[][]
Получает факторизацию числа _n_ в виде массива пар чисел: делитель-показатель.  
Сложность примерно _**O(sqrt(p)log(n))**_, где _p_ - наибольший простой делитель числа _n_

- ```typescript
  function getMeanForTfmnFactorization(n: number | string | BigInt): BigInt[][]
Работает так же, как и `getFactorization`, но во внутренней логике вызывает 
`findMeanForTfmnMinFactor` вместо `findMinFactor`

- ```typescript
  function getDividers(n: number | string | BigInt): BigInt[]
Получает список всех делителей числа _n_. Сложность примерно _**O(sqrt(n)log(n))**_

- ```typescript
  function abs(n: number | BigInt): number | BigInt
Вычисляет абсолютное значение числа _n_

- ```typescript
  function min(a: number | BigInt, b: number | BigInt): number | BigInt
Возвращает меньшее из _a_, _b_

- ```typescript
  function max(a: number | BigInt, b: number | BigInt): number | BigInt
Возвращает большее из _a_, _b_

- ```typescript
  function euler(n: number | string | BigInt): BigInt
Вычисляет функцию Эйлера для числа _n_. Использует в реализации `getPrimeDividers`,
сложность совпадает со сложностью этой функции

- ```typescript
  function eulerForTwoPrime(p: number | string | BigInt, q: number | string | BigInt): BigInt
Вычисляет функцию Эйлера для числа _pq_. На деле просто возвращает _(p - 1)(q - 1)_.
Сложность _**O(log(pq))**_

- ```typescript
  function eulerOfPrimary(p: number | string | BigInt): BigInt
Вычисляет функцию Эйлера для простого числа. На деле просто возвращает _p-1_

- ```typescript
  function searchRoot(n: number | string | BigInt, power: number | string | BigInt = 2): [boolean, BigInt]
Используя бинарный поиск, вычисляет корень из _n_ степени _power_. Если корень найден,
вернёт `[true, sqrt(n)]`, иначе – `[false, ceil(sqrt(n))]`. Сложность _**O(log²(n))**_

- ```typescript
  function powerByModal(base: BigInt, power: BigInt, number: BigInt): BigInt
Находит остаток от деления числа _number ^ power_ на _base_.
Имеет сложность _**O(log(n)log(p))**_, если _power_ неотрицательно,
_**O(log²(n)log(p))**_ если _power_ отрицательно (_n, p_ – сокращения от _number, power_).

Примечание: На самом деле, в функцию можно передать параметры типа `string` и `number`, они просто
будут приведены к `BigInt`

- ```typescript
  function getInverseByModal(base: BigInt, number: BigInt): BigInt
Вычисляет обратное к _number_ число по модулю _base_. Использует алгоритм Евклида,
приблизительная сложность O(log²(number))

Примечание: На самом деле, в функцию можно передать параметры типа `string` и `number`, они просто
будут приведены к `BigInt`

- ```typescript
  function chines(values: BigInt[], bases: BigInt[]): BigInt
Находит наименьшее решение системы сравнений по модулю. _values_ – остатки от деления
этого решения на _bases_. Сложность сложная. Лучше посмотрите реализацию в файле `math.js`.

- ```typescript
  function prod(array: BigInt[]): BigInt
Находит произведение всех элементов _array_.

- ```typescript
  function calculateContinuedFraction(numerator: BigInt, denominator: BigInt): BigInt[]
Возвращает дробь _numerator / denominator_ в виде цепной дроби. 
Примерная сложность _**O(log²(denominator))**_

Примечание: На самом деле, в функцию можно передать параметры типа `string` и `number`, они просто
будут приведены к `BigInt`

- ```typescript
  function getApproximationsForContinuedFraction(fraction: BigInt[]): Bigint[][]
Возвращает список пар числитель-знаменатель, аппроксимирующих цепную дробь _fraction_.
Пары отсортированы по точности аппроксимации, первая пара всегда _0/1_, последняя - 
исходная

- ```typescript
  function quadraticEquation(b: number | string | BigInt, c: number | string | BigInt): [BigInt, BigInt]
Решает квадратное уравнение `x² + bx + c = 0`. Если уравнение не имеет целочисленных
решений, возвращает приблизительные

- ```typescript
  function bezout(a: number | string | BigInt, b: number | string | BigInt): [x: BigInt, y: BigInt, gcd: BigInt]
Восстанавливает соотношение Безу для чисел _a, b_: `ax + by = gcd`. 
Использует алгоритм Евклида, имеет сложность _**O(log²(n))**_, где _n_ – большее из _a, b_.


---
### Методы для генерации различных наборов данных <span id="generate"></span>
- ```typescript
  function printTfmnsWithPairs(tfmns)

- ```typescript
  function strTfmnWithPairs(tfmn)

- ```typescript
  function generateUsingGcd(maxM)

- ```typescript
  function tOf(n)

- ```typescript
  function tOfBigInt(n)

- ```typescript
  function tfmnOf(a, b)

- ```typescript
  function tfmnByFactorizations(a, b, apb, amb)

- ```typescript
  function getFormattedTime(milliseconds)

- ```typescript
  function checkSquareExistUseTfmn(m1, n1, tfmn)

- ```typescript
  function checkSquareExist(m1, n1, m2, n2)

- ```typescript
  function checkSqrt(n)

- ```typescript
  function gcdForMultiplies(a, b)

- ```typescript
  function getAllMAndNForFmn(fmn)

- ```typescript
  function getAllFmnForTfmn(tfmn, maxK = 100n)

- ```typescript
  function getAllFmnForTfmn2(tfmn, maxK = 100n)

- ```typescript
  function F7(a, b)

- ```typescript
  function factorizeAllUntil(n)

- ```typescript
  function addFactorToList(list, factor)

- ```typescript
  function addFactorization()

- ```typescript
  function generateUsingFactorizationAndBinarySearch(maxM)

- ```typescript
  function generateUsingUsualFilter(maxM)

- ```typescript
  function generateUsingUsualFilterAndBinarySearch(maxM)

- ```typescript
  function binarySearchIndex(array, checker)

- ```typescript
  function insert(value, index, array)

- ```typescript
  function F1ForGenerating(m, n)

- ```typescript
  function F3ForGenerating(m, n)

- ```typescript
  function F4ForGenerating(m, n)

- ```typescript
  function F7ForGenerating(m, n)

- ```typescript
  function generateForOnlyOne(maxM, string)

- ```typescript
  function generateForOnlyOneF(maxM, method)

- ```typescript
  function F8NextStep(a, b)

- ```typescript
  function F8ForGenerate(u, v)

- ```typescript
  function searchResourceForF8(maxM)

- ```typescript
  function F8NextSteps(maxLength, startA, startB)

- ```typescript
  function generateForOnlyF8(maxM, maxLength)

- ```typescript
  function generateWithPrepareFiltration(maxM)

- ```typescript
  function generateForPithagorasOf(maxM, type)

- ```typescript
  function generateForPithagoras(maxM, getter)

- ```typescript
  function getPithagoras1(m, n)

- ```typescript
  function getPithagoras2(m, n)

- ```typescript
  function getPithagoras3(m, n)

- ```typescript
  function tfmnListMinus(list1, list2)

- ```typescript
  function tfmnListUnion()

- ```typescript
  function mergeTfmn(first, second)

- ```typescript
  function generateForSearch4kPlus3Primes(maxM)
здесь круто

### Методы для работы с векторами <span id="vector"></span>


