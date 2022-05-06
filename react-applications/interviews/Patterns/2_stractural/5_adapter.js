/*
Адаптер — это структурный паттерн проектирования,
который позволяет объектам с несовместимыми интерфейсами работать вместе
*/

class OldCalc {
  operation(x, y, operation) {
    switch (operation) {
      case 'add':
        return x + y;
      case 'sub':
        return x - y;
      default:
        return x + y;
    }
  }
}

class NewCalc {
  add(x, y) {
    return x + y;
  }

  sub(x, y) {
    return x - y;
  }
}

class CalcAdapter {
  constructor() {
    this.calc = new NewCalc();
  }

  operation(x, y, operation) {
    switch (operation) {
      case 'add':
        return this.calc.add(x, y);
      case 'sub':
        return this.calc.sub(x, y);
      default:
        return this.calc.add(x, y);
    }
  }
}

const oldCalc = new OldCalc();
const newCalc = new NewCalc();
const adapter = new CalcAdapter();

console.log(oldCalc.operation(12, 13, 'add')); // 25
console.log(newCalc.add(12, 13)); // 25
console.log(adapter.operation(12, 6, 'sub')); // 6
