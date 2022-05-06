/*
Цепочка обязанностей — это поведенческий паттерн проектирования,
который позволяет передавать запросы последовательно по цепочке
обработчиков.
Каждый последующий обработчик решает, может ли он обработать запрос
сам и стоит ли передавать запрос дальше по цепи.
*/

class MySum {
  constructor(initialValue = 42) {
    this.sum = initialValue;
  }

  add(value) {
    this.sum += value;
    return this;
  }
}

const sum1 = new MySum();

console.log(sum1.add(8).add(1).add(4).sum); // 55
