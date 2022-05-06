/*
Наблюдатель — это поведенческий паттерн проектирования,
который создаёт механизм подписки, позволяющий одним объектам следить
и реагировать на события, происходящие в других объектах
*/

class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  fire(action) {
    this.observers.forEach((observer) => {
      observer.update(action);
    });
  }
}

class Observer {
  constructor(state = 1) {
    this.state = state;
    this.initialState = state;
  }

  update(action) {
    switch (action.type) {
      case 'INCREMENT': {
        this.state = ++this.state;
        break;
      }
      case 'DECREMENT': {
        this.state = --this.state;
        break;
      }
      case 'ADD': {
        this.state += action.payload;
        break;
      }
      default:
        this.state = this.initialState;
    }
  }
}

const stream = new Subject();
const obs1 = new Observer();
const obs2 = new Observer(13);

stream.subscribe(obs1);
stream.subscribe(obs2);

console.log(obs1.state); // 1
console.log(obs2.state); // 13
console.log('------------');

stream.fire({ type: 'INCREMENT' });

console.log(obs1.state); // 2
console.log(obs2.state); // 14
console.log('------------');

stream.fire({ type: 'DECREMENT' });
stream.fire({ type: 'DECREMENT' });

console.log(obs1.state); // 0
console.log(obs2.state); // 12
console.log('------------');

stream.fire({ type: 'ADD', payload: 10 });

console.log(obs1.state); // 10
console.log(obs2.state); // 22
