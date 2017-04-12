import {assert} from 'chai';

import {resetGreeting, RESET_GREETING} from '../src/actions';

describe('Main', () => {
  it('says hello properly', () => {
    const action = resetGreeting();
    assert(action.type === RESET_GREETING, 'aha2')
  });
});
