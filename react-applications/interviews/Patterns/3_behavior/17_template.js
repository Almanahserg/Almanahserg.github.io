/*
Шаблонный метод — это поведенческий паттерн проектирования,
который определяет скелет алгоритма, перекладывая ответственность за
некоторые его шаги на подклассы. Паттерн позволяет подклассам
переопределять шаги алгоритма, не меняя его общей структуры
*/

class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  responsibilities() {}

  work() {
    return `${this.name} work is ${this.responsibilities()}`;
  }

  getPaid() {
    return `${this.name} have salary ${this.salary}`;
  }
}

class Developer extends Employee {
  constructor(name, salary) {
    super(name, salary);
  }

  responsibilities() {
    return 'developing';
  }
}

class Driver extends Employee {
  constructor(name, salary) {
    super(name, salary);
  }

  responsibilities() {
    return 'driving';
  }
}

const dev = new Developer('Me', 1000);
const driver = new Driver('Him', 500);

console.log(dev.getPaid());
console.log(dev.work());

console.log('-----------');

console.log(driver.getPaid());
console.log(driver.work());
