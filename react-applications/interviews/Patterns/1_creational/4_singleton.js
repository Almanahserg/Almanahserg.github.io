/*
Одиночка — это порождающий паттерн проектирования,
который гарантирует, что у класса есть только один экземпляр,
и предоставляет к нему глобальную точку доступа.
*/

class Database {
  constructor(data) {
    if (Database.exists) {
      return Database.instance;
    }

    Database.instance = this;
    Database.exists = true;
    this.data = data;
  }

  getData() {
    return this.data;
  }
}

const mongo = new Database('MongoDB');
const mySQL = new Database('mySQL');

console.log(mongo.getData()); // MongoDB
console.log(mySQL.getData()); // MongoDB
