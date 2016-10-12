/**
 * Промисфицирует любой параметр... Далее его можно не только как промис использовать, но и чейнить (в скобки then()), - см. пример ниже
 * @param someThing
 * @returns {Promise}
 */
export function promisify(someThing) {
  return new Promise( (resolve) => resolve(someThing) )
}

// ПРИМЕР
/*

 let iScroller = new InfiniteScroller({}) //В данном классе самый обычный constructor(), - без return

 // Теперь в iScroller есть ссылка на его this, а не на new Promise( resolve => resolve(this))
 // Если же я промисифицирую iScroller, то this обернётся в промис и далее могу уже писать .then()
 promisify(iScroller)
 .then(iScroller.moveNextRecordsToClientList)
 .then(iScroller.moveNextRecordsToClientList)
 .then( (iScrollerThis) => iScrollerThis.clientList.length
 )

 //Ну, а методы InfiniteScroller(), чтобы их можно было чейнить тоже должны не return this, а return promisify (this) или return this внутри метода уже должно быть внутри промиса...
 //И принимать в качестве параметра они должы промис на this из предыдущего метода. Пример:

  class InfiniteScroller() {
   moveNextRecordsToClientList (thisEntity) { //Принимаем ссылку на экземпляр данного класса в рамках чейнинга
     thisEntity.clientList.push(...thisEntity._bufferedRecords.splice(0, thisEntity.recordsCountToAdd))  //Синхронная команда
     if (thisEntity.minBufferLength > thisEntity._bufferedRecords.length) thisEntity.originalListSource.fetch({  //Асинхронная команда
       fromRecordNumber: thisEntity.clientList.length,
       requestedRecordsCount: thisEntity.recordsCountToBufferAdd
     })
     .then( (requestedRecords) => thisEntity._bufferedRecords.push(...requestedRecords))
     return promisify(thisEntity) //Возвращаем ссылку на экземпляр данного класса для чейнинга
   }
  }

*/
