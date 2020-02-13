// Basic structure

// (function() {
//   // Declare private vars and functions

//   return {
//     // Declare public var and functions
//   }
// })();

// STANDARD MODULE PATTERN
// const UIController = (function() {
//   let text = 'Hello World';

//   const changeText = function() {
//     const element = document.querySelector('h1');
//     element.textContent = text;
//   };

//   return {
//     callChangeText: function() {
//       changeText();
//       console.log(text);
//     }
//   };
// })();

// UIController.callChangeText();

// REVEALING MODULE PATTERN
const ItemController = (function() {
  let data = [];

  function add(item) {
    data.push(item);
    console.log('Item Added...');
  }

  function get(id) {
    return data.find(item => item.id === id);
  }

  return {
    add,
    get
  };
})();

ItemController.add({ id: 1, name: 'Juan' });
console.log(ItemController.get(1));
