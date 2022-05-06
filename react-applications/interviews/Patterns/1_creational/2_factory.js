/*
Фабричный метод — это порождающий паттерн проектирования,
который определяет общий интерфейс для создания объектов в суперклассе,
позволяя подклассам изменять тип создаваемых объектов
*/

class SimpleMembership {
  constructor(name) {
    this.name = name;
    this.cost = 50;
  }
}

class StandardMembership {
  constructor(name) {
    this.name = name;
    this.cost = 150;
  }
}

class PremiumMembership {
  constructor(name) {
    this.name = name;
    this.cost = 500;
  }
}

class MemberFactory {
  static list = {
    simple: SimpleMembership,
    standard: StandardMembership,
    premium: PremiumMembership,
  };

  create(name, type = 'simple') {
    const Membership = MemberFactory.list[type];
    const member = new Membership(name);

    member.type = type;
    member.define = function () {
      console.log(`${this.name} (${this.type}): ${this.cost}`);
    };

    return member;
  }
}

const factory = new MemberFactory();

const members = [
  factory.create('Me', 'simple'),
  factory.create('Him', 'standard'),
  factory.create('She', 'premium'),
];

members.forEach((item) => item.define());

/*
Me (simple): 50
Him (standard): 150
She (premium): 500
*/
