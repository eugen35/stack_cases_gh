// npm install --save co babel-polyfill
import co from 'co' //Для работы co нужен babel-polyfill
import 'babel-polyfill' //Его лучше подключить в одной entry point, но у меня пока такой нет... Если не подключим, - ошибка будет эReferenceError: regeneratorRuntime is not definedэ


/* ПРИМЕР ИСПОЛЬЗОВАНИЯ
co(function*() {
  let result = yield new Promise(  //Обратите внимание, что здесь нужно писать yield, а не yield*  !!!!
      resolve = > setTimeout(resolve, 1000, 1)
  )
  console.log(result); // 1
})

//Внимание! ГЕНЕРАТОР при таком использовании (даже если есть return) возвращает ПРОМИС на результат, - в данном случае промис на цифру 1
*/