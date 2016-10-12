// npm install --save co babel-polyfill
import co from 'co' //Для работы co нужен babel-polyfill
import 'babel-polyfill' //Его лучше подключить в одной entry point, но у меня пока такой нет... Если не подключим, - ошибка будет эReferenceError: regeneratorRuntime is not definedэ


/* ПРИМЕР ИСПОЛЬЗОВАНИЯ
co(function*() {
  let result = yield new Promise(
      resolve = > setTimeout(resolve, 1000, 1)
  )
  console.log(result); // 1
})
*/