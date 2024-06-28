//fibonacci. Напишіть функцію-генератор fibonacci, 
//яка повертає наступне число Фібоначчі при кожному виклику. 
//Генератор повинен зупинитися після досягнення заданої межі n.

function* fibonacci(n) {
  let a = 0, b = 1;
  while (a <= n) {
      yield a;
      [a, b] = [b, a + b];
  }
}

const fibGen = fibonacci(10);

console.log(fibGen.next().value);
console.log(fibGen.next().value);
console.log(fibGen.next().value);
console.log(fibGen.next().value);
console.log(fibGen.next().value);
console.log(fibGen.next().value);
console.log(fibGen.next().value);


// Виведе 0 console.log(fibGen.next().value);
// Виведе 1 console.log(fibGen.next().value);
// Виведе 1 console.log(fibGen.next().value);
// Виведе 2 console.log(fibGen.next().value);
// Виведе 3 console.log(fibGen.next().value);
// ... і так далі, поки не досягне або перевищить число 10

//flatten. Напишіть функцію-генератор flatten, яка приймає масив, що містить вкладені масиви, 
//і повертає генератор для ітерації по всіх елементах вкладених масивів. Зверніть увагу, 
//що ваш генератор повинен обробляти різні рівні вкладеності та повертати всі елементи 
//в одновимірному порядку.

function* flatten(array) {
  for (let item of array) {
      if (Array.isArray(item)) {
          yield* flatten(item);
      } else {
          yield item;
      }
  }
}

const nestedArr = [1, [2, 3], [4, 5, [6, 7]]];
const flattenGen = flatten(nestedArr);

console.log([...flattenGen]);
// [1, 2, 3, 4, 5, 6, 7]

//asyncGenerator. Створіть функцію-генератор asyncGenerator, 
//яка отримуватиме на вході масив промісів і повертатиме результати виконання цих промісів 
//у міру їхнього завершення.

async function* asyncGenerator(promises) {
  const results = await Promise.allSettled(promises);
  for (const result of results) {
      if (result.status === "fulfilled") {
          yield result.value;
      } else {
          yield Promise.reject(result.reason);
      }
  }
}


const promises = [
  new Promise(resolve => setTimeout(() => resolve('First'), 2000)),
  new Promise(resolve => setTimeout(() => resolve('Second'), 500)),
  new Promise((resolve, reject) => setTimeout(() => reject('Third failed'), 3000))
];

(async () => {
  for await (const result of asyncGenerator(promises)) {
      console.log(result);
  }
})();