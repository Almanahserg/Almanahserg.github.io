/*
Команда — это поведенческий паттерн проектирования,
который превращает запросы в объекты, позволяя передавать их
как аргументы при вызове методов, ставить запросы в очередь,
логировать их, а также поддерживать отмену операций.
*/

class MyMath {
  constructor(initialValue = 0) {
    this.number = initialValue;
  }

  square() {
    return this.number ** 2;
  }

  cube() {
    return this.number ** 3;
  }
}

class Command {
  constructor(subject) {
    this.subject = subject;
    this.commandExecuted = [];
  }

  execute(command) {
    this.commandExecuted.push(command);
    return this.subject[command]();
  }
}

const x = new Command(new MyMath(2));

console.log(x.execute('square')); // 4
console.log(x.execute('cube')); // 8

console.log(x.commandExecuted); // [ 'square', 'cube' ]
