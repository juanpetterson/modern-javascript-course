async function getUsers() {
  // Await response of the fetch call
  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  // Only proceed once its resovled
  const data = await response.json();

  // only proceed once seconde promise is resolved
  return data;
}

getUsers().then(users => console.log(users));
