/*
Прототип — это порождающий паттерн проектирования,
который позволяет копировать объекты, не вдаваясь в подробности их реализации.
*/

const car = {
  wheels: 4,

  init() {
    console.log(`у меня есть ${this.wheels} колеса. Владелец - ${this.owner}`);
  },
};

const carWithOwner = Object.create(car, {
  owner: {
    value: 'Iurii',
  },
});

carWithOwner.init(); // у меня есть 4 колеса. Владелец - Iurii
