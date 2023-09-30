// require('dotenv').config();

// const dataDev = parseInt(process.env.dataDev);
// const dataTest = parseInt(process.env.dataTest);
// const dataProd = parseInt(process.env.dataProd);

// const objEnv = {
//   "development": {
//     "username": dataDev.userName,
//     "password": dataDev.password,
//     "database": dataDev.dataBase,
//     "host": dataDev.host,
//     "dialect": dataDev.sqlType,
//   },
//   "test": {
//     "username": dataTest.userName,
//     "password": dataTest.password,
//     "database": dataTest.dataBase,
//     "host": dataTest.host,
//     "dialect": dataTest.sqlType,
//   },
//   "production": {
//     "username": dataProd.userName,
//     "password": dataProd.password,
//     "database": dataProd.dataBase,
//     "host": dataProd.host,
//     "dialect": dataProd.sqlType,
//   }
// }

// const objDeclarado = {
//   "development": {
//     "username": "root",
//     "password": "", /* aquí coloca tu password a la BD de development */
//     "database": "air_sound_studio",
//     "host": "172.0.0.1",
//     "dialect": "mysql",
//   },
//   "test": {
//     "username": "root",
//     "password": "", /* aquí coloca tu password a la BD de development */
//     "database": "air_sound_studio",
//     "host": "172.0.0.1",
//     "dialect": "mysql",
//   },
//   "production": {
//     "username": "root",
//     "password": "", /* aquí coloca tu password a la BD de development */
//     "database": "air_sound_studio",
//     "host": "172.0.0.1",
//     "dialect": "mysql",
//   }
// }

module.exports = {
  "development": {
    "username": "root",
    "password": "", /* aquí coloca tu password a la BD de development */
    "database": "air_sound_studio",
    "host": "localhost",
    "dialect": "mysql",
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};