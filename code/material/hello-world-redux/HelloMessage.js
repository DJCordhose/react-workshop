import React from 'react';
import { connect } from 'react-redux';

const clearGreeting = () => {
  return {
    type: 'CLEAR'
  }
};

const updateGreeting = (greeting) => {
  return {
    type: 'UPDATE',
    greeting
  }
};

class HelloMessage extends React.Component {
    render() {
      const {greeting, clearGreeting, updateGreeting} = this.props;
        return (
            <div>
                <input ref={input => this.input = input}
                       onChange={event => updateGreeting(event.target.value)}
                       value={greeting} />
                <p>{greeting}, World</p>
                <button
                    onClick={() => this.reset()}>
                    Clear
                </button>
            </div>);
    }
    reset() {
      const {greeting, clearGreeting, updateGreeting} = this.props;
        this.props.clearGreeting();
        this.input.focus();
    }
}

const selectGreetingFromState = (state) => state.greeting;

export default connect(
  state => ({
    greeting: selectGreetingFromState(state)
  }),
  {
    clearGreeting,
    updateGreeting
  }
)(HelloMessage);