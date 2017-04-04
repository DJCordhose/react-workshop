/* @flow */

import { normalize, denormalize, schema } from 'normalizr';
import originalData from './blogposts.json';

console.log(`Not normalized: ${JSON.stringify(originalData, null, "  ")}`);

const user = new schema.Entity('user');

const comment = new schema.Entity('comments', {
  commenter: user
});

const article = new schema.Entity('articles', {
  author: user,
  comments: [ comment ]
});

const blog = new schema.Entity('blog', {
  articles: [ article ]
}, {
  idAttribute: 'blogname'
});

const normalizedData = normalize(originalData, blog);

console.log(`Normalized: ${JSON.stringify(normalizedData, null, '  ')}`);

const paul = normalizedData.entities.user["1"];
paul.name = 'Paul II';

console.log(`Paul: ${JSON.stringify(paul, null, '  ')}`);

const denormalizedData = denormalize({user: "1"},  user , normalizedData.entities);

console.log(`Denormalized: ${JSON.stringify(denormalizedData, null, '  ')}`);
