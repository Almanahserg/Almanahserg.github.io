/*
Посредник — это поведенческий паттерн проектирования,
который позволяет уменьшить связанность множества классов между собой,
благодаря перемещению этих связей в один класс-посредник
*/

class User {
  constructor(name) {
    this.name = name;
    this.room = null;
  }

  send(message, to) {
    this.room.send(message, this, to);
  }

  receive(message, from) {
    console.log(`${from.name} => ${this.name}: ${message}`);
  }
}

class ChatRoom {
  constructor() {
    this.users = {};
  }

  register(user) {
    this.users[user.name] = user;
    user.room = this;
  }

  send(message, from, to) {
    if (to) {
      to.receive(message, from);
    } else {
      Object.keys(this.users).forEach((key) => {
        if (this.users[key] !== from) {
          this.users[key].receive(message, from);
        }
      });
    }
  }
}

const me = new User('Me');
const him = new User('Him');
const she = new User('She');

const room = new ChatRoom();

room.register(me);
room.register(him);
room.register(she);

me.send('Hi', she);
she.send('Hello', him);
him.send('Hi all');
