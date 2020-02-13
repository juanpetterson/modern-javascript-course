const User = function(name) {
  this.id = Math.random();
  this.name = name;
  this.chatroom = null;
};

User.prototype = {
  send: function(message, to) {
    this.chatroom.send(message, this, to);
  },
  recieve: function(message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
};

const Chatroom = function() {
  let users = {}; // list of users

  return {
    register: function(user) {
      users[user.id] = user;
      user.chatroom = this;
    },
    send: function(message, from, to) {
      if (to) {
        // Single user message
        to.recieve(message, from);
      } else {
        // Mass message
        for (key in users) {
          if (users[key] !== from) {
            users[key].recieve(message, from);
          }
        }
      }
    }
  };
};

const juan = new User('Juan Petterson');
const ruro = new User('Ruro');
const priscila = new User('Priscila');

const chatroom = new Chatroom();

chatroom.register(juan);
chatroom.register(ruro);
chatroom.register(priscila);

juan.send('Hello Ruro', ruro);
priscila.send('Hello Juan', juan);
ruro.send('Hello EVERYONE!');
