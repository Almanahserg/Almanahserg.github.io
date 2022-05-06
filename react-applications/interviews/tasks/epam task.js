// task: sum(5, 0)
// task: sum(5)(0)

// function sum(...args) {
//   if (args.length > 1) {
//     return args.reduce((acc, curr) => acc + curr, 0);
//   } else {
//     return (b) => +args + b;
//   }
// }

const sss = (arr) => arr.reduce((acc, curr) => acc + curr, 0);

function sum(...args) {
  const sum = sss(args);
  if (args.length > 1) {
    return sss(args);
  } else {
    return (second) => +args + second;
  }
}

console.log(sum(5, 0));
console.log(sum(5)(0));

const fn = (...argsA) => {
  const sumA = sss(argsA);

  return (...argsB) => {
    const sumB = sss(argsB);

    if (argsB.length) {
      return fn(sumA + sumB);
    } else {
      return sumA;
    }
  };
};

console.log(fn(123)(12)(1, 3, 4));
