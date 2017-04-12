import {assert} from 'chai';

import {resetGreeting, RESET_GREETING, UPDATE_GREETING} from '../src/actions';

describe('actions', () => {
  it('reset greetings has proper type', () => {
    const action = resetGreeting();
    assert(action.type === RESET_GREETING, 'aha2')
  });
});
