// import {describe, it} from 'mocha';
import {assert} from 'chai';

import {resetGreeting, RESET_GREETING} from '../src/actions';

describe('Main', () => {
  it('says hello properly 2', () => {
    const action = resetGreeting();
    assert(action.type === RESET_GREETING, 'aha2')
  });
});
