/*
Состояние — это поведенческий паттерн проектирования,
который позволяет объектам менять поведение в зависимости от своего
состояния. Извне создаётся впечатление, что изменился класс объекта
*/

class Light {
  constructor(light) {
    this.light = light;
  }
}

class Red extends Light {
  constructor() {
    super('red');
  }

  sign() {
    return 'STOP';
  }
}

class Yellow extends Light {
  constructor() {
    super('yellow');
  }

  sign() {
    return 'READY';
  }
}

class Green extends Light {
  constructor() {
    super('green');
  }

  sign() {
    return 'GO';
  }
}

class Traffic {
  constructor() {
    this.states = [new Red(), new Yellow(), new Green()];
    this.current = this.states[0];
  }

  change() {
    const total = this.states.length;
    let index = this.states.findIndex((light) => light === this.current);

    if (index + 1 < total) {
      this.current = this.states[index + 1];
    } else {
      this.current = this.states[0];
    }
  }

  sign() {
    return this.current.sign();
  }
}

const traffic = new Traffic();
console.log(traffic.sign());

traffic.change();
console.log(traffic.sign());

traffic.change();
console.log(traffic.sign());
