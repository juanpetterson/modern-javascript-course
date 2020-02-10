class Person {
  constructor(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = new Date(dob);
  }

  greeting() {
    return `Hello there ${this.firstName} ${this.lastName}`;
  }

  calculateAge() {
    const diff = Date.now() - this.birthday.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getsMarried(newLastName) {
    this.lastName = newLastName;
  }

  static addNumbers(a, b) {
    return a + b;
  }
}

const mary = new Person('Mary', 'Williams', '11-13-1980');

mary.getsMarried('Thompson');

console.log(mary.greeting());
console.log(mary.calculateAge());

console.log(Person.addNumbers(5, 10));
