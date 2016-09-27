//npm install mysql bluebird --save

var mysql = require('mysql'),
    Promise = require('bluebird'),
    using=Promise.using;

//Промисфицируем mysql
Promise.promisifyAll(mysql);
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

//Создаём бассейн - тут как раз и конфиг
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : '127.0.0.1',
  user            : 'root',
  password        : 'qwerty06',
  database        : 'crm',
  charset         : 'utf8'
});

//Добавляем к промисфицированной функции getConnection диспозер (удалитель) - штука, которая автоматически закроет connection после использования
function getSqlConnection(){
  return pool.getConnectionAsync().disposer(function(connection){
    connection.release();
  });
}

//Вызывает SQL-запрос и возращает promise на его результат
//При этом query может быть не только строкой, но и объектом с запросом и опциями (см., https://github.com/felixge/node-mysql#performing-queries)
function runQuery(query){
  return using(getSqlConnection(), function (connection) {  //using после окончания работы с коннектион автоматически удалит его методом, указанным мной в модуле getSqlConnection
    return connection.queryAsync(query);
  });
}


module.exports.getSqlConnection = getSqlConnection;
module.exports.runQuery = runQuery;


//ПРИМЕР РАБОТЫ
//Возвращает промис на результат выполнения запроса
/*
  var query='SELECT * FROM tblName WHERE условие ORDER BY поле LIMIT 20 OFFSET 100';
  runQuery(query);
*/