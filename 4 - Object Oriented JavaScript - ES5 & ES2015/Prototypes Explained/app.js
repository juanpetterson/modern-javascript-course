// Object.prototype
// Person.prototype

function Person(firstName, lastName, dob) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthday = new Date(dob);
  // this.calculateAge = function() {
  //   const diff = Date.now() - this.birthday.getTime();
  //   const ageDate = new Date(diff);
  //   return Math.abs(ageDate.getUTCFullYear() - 1970);
  // };
}

// Calculate Age
Person.prototype.calculateAge = this.calculateAge = function() {
  const diff = Date.now() - this.birthday.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

// Get full name
Person.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

// Gets Married
Person.prototype.getsMaried = function(newLastName) {
  this.lastName = newLastName;
};

const john = new Person('John', 'Doe', '8-12-90');
const mary = new Person('Mary', 'Johnson', 'March 20 1978');

console.log(mary);

console.log(john.calculateAge());
console.log(mary.getFullName());

mary.getsMaried('Smith');
console.log(mary.getFullName());

console.log(mary.hasOwnProperty('firstName'));
console.log(mary.hasOwnProperty('getFullname')); // its false because this is in prototype it is not in part of it is own property
