// var, let, const

// var name = 'John Doe';

// console.log(name);
// name = 'Steve Smith';
// console.log(name);

// // Init Var
// var greeting;
// console.log(greeting);
// greeting = 'Hello';
// console.log(greeting);

// letters, numbers, _, $
// Can not start with number

// Multi word vars

// var firstName = 'John'; // Camel case
// var first_name = 'John'; // Underscore
// var FirstName = 'John'; // Pascal case
// var firstname = 'John'; // Not recomended

// number = String(4 + 4);

// var name = 'Global';

// function sayName() {
//   var name;
//   console.log(name); // undefined
//   if (true) {
//     var name = 'local';
//     console.log(name); // ‘local’
//   }
// }

// sayName();

// var callbacks = [];

// for (var i = 0; i < 10; i++) {
//   callbacks.push(function() {
//     console.log(i);
//   });
// }

// callbacks[2]();

const add = function(sum) {
  return function(sum2) {
    return sum + sum2;
  };
};

// console.log(add(2)(5));

const addWith2 = add(2);

console.log(addWith2(3));
