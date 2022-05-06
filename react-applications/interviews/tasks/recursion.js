const add = (a) => (b) => typeof b === 'number' ? add(b + a) : a;

console.log(add(1)(2)());
