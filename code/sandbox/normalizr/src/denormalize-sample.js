import { denormalize, schema } from 'normalizr';

const user = new schema.Entity('users');
const mySchema = { users: [ user ] }
const entities = { users: { '1': { id: 1, name: "Oma"  }, '2': { id: 2, name: "Opa"  } } };
const denormalizedData = denormalize({ users: [ 1 ] }, mySchema, entities);

console.log(`Denormalized: ${JSON.stringify(denormalizedData, null, '  ')}`);

