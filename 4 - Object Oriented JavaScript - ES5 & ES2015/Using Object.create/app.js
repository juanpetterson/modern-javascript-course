const personPrototypes = {
  greeting: function() {
    return `Hello there ${this.firstName} ${this.lastName}`;
  },
  getsMarrierd: function(newLastname) {
    this.lastName = newLastname;
  }
};

const mary = Object.create(personPrototypes);
mary.firstName = 'Mary';
mary.lastName = 'Williams';

mary.getsMarrierd('Thompson');

console.log(mary.greeting());

const brad = Object.create(personPrototypes, {
  firstName: { value: 'Brad' },
  lastName: { value: 'Traversy' },
  age: { value: 36 }
});

console.log(brad);
console.log(brad.greeting());
