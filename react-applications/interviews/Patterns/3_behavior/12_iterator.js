/*
Итератор — это поведенческий паттерн проектирования,
который даёт возможность последовательно обходить элементы составных
объектов, не раскрывая их внутреннего представления.
*/

// Variant 1
class MyIterator {
  constructor(data) {
    this.index = 0;
    this.data = data;
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.index < this.data.length) {
          return {
            value: this.data[this.index++],
            done: false,
          };
        } else {
          this.index = 0;
          return {
            value: void 0,
            done: true,
          };
        }
      },
    };
  }
}

const iterator = new MyIterator(['this', 'is', 'iterator']);

for (const value of iterator) {
  console.log('Value:', value);
}

// Value: this
// Value: is
// Value: iterator

console.log('------------------');

// Variant 2

function* generator(collection) {
  let index = 0;

  while (index < collection.length) {
    yield collection[index++];
  }
}

const gen = generator(['this', 'is', 'iterator']);

for (const value of gen) {
  console.log('Value:', value);
}

// Value: this
// Value: is
// Value: iterator

console.log('------------------');

const newGen = generator(['this', 'is', 'iterator']);

console.log(newGen.next().value);
console.log(newGen.next().value);
console.log(newGen.next().value);

// this
// is
// iterator
