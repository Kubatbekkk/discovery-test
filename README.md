### Discovery Studio Test Store (версия 1, без рефакторинга) |  [Deploy Demo](https://discovery-test.netlify.app/)
==========================================================
<br/>
Начало: 17.05.2023
<br/>
Выполнено: 18.05.2023
<br/>

Cкриншот выполненного задания:
<img width="1272" alt="Screenshot 2023-05-18 at 16 18 02" src="https://github.com/Kubatbekkk/discovery-test/assets/74785255/b048b905-4469-4be0-82fa-000ad2ed0ad9">
<br/>
<br/>

- [x] Получить данные из файла data.json и вывести их на страницу как это показано на рис."пример.png".
<br/><br/>
![Example](https://github.com/Kubatbekkk/discovery-test/assets/74785255/15d2c25b-4069-49eb-a36c-5852c50c4df8)

`Показанные на рисунке параметры находятся в узле Goods.
  "C" - цена в долларах(USD) - вывести в рублях(курс выбрать произвольно),
  "G" - id группы,
  "T" - id товара,
  "P" - сколько единиц товара осталось (параметр, который указан в скобках в названии).`

`Сопоставления id групп и товаров с их названиями находятся в файле names.json.`

- [x] После вывода данных навесить обработчики для добавления выбранного товара в корзину и удаления из нее. Пример корзины показан в файле "Корзина.png".
- [x] Сделать расчет общей суммы товаров и вывести отдельным полем.
- [x] Корзина находится на одной и той же странице вместе со списком товаров.

(\*)

- [x] Вывести данные используя привязку к представлению и возможностью последующего изменения (two-way binding). Можно использовать фреймворки.
- [x] Сделать обновление цены товара в зависимости от курса валюты.
- [x] С интервалом в 15 секунд читать исходный файл data.json и одновременно менять курс доллара (вручную) на значение от 20 до 80, выполняя обновление данных в модели (с изменением в представлении).

- [x] Если цена увеличилось в большую сторону - подсветить ячейку красным, если в меньшую - зеленым.

`Дополнительная информация: Дизайну, показанному в примерах, следовать не обязательно. Прокомментировать основные действия. Интересные решения приветствуются.`

Основная разработка велась в [stackblitz](https://stackblitz.com/edit/react-bw8wsl?file=src/App.js)
