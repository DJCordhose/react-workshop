const INITIAL_GREETINGS = [
  { id: 1, name: 'Klaus', greeting: 'Moin' },
  { id: 2, name: 'Susi', greeting: 'Hello!' },
  { id: 3, name: 'Max', greeting: 'Bonjour' },
  { id: 4, name: 'Susi', greeting: 'How are you?' }
];

class Db {
  constructor() {
    this.initialize();
  }

  initialize() {
    this._greetings = [...INITIAL_GREETINGS];
    this._idCounter = this._greetings.length;
  }

  findById(id) {
    return this._greetings.find(greeting => greeting.id === id);
  }

  findAll() {
    return this._greetings;
  }

  insert(greeting) {
    const newGreeting = {
      id:       ++this._idCounter,
      name:     greeting.name,
      greeting: greeting.greeting
    };
    this._greetings.push(newGreeting);
    return newGreeting.id;
  }

}

const db = new Db();
module.exports = db;
