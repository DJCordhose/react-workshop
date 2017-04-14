import * as React from 'react';
import {SyntheticEvent} from "react";
import { connect } from 'react-redux';

import * as actions from '../../actions';

import {State} from '../../../store';

import HelloMessageInput from './HelloMessageInput';
import HelloMessageOutput from './HelloMessageOutput';
import HelloMessageButton from './HelloMessageButton';

type Props = Partial<State> & {
    greeting: string;
    repeat?: boolean;
    resetGreeting: typeof actions.resetGreeting;
    updateGreeting: typeof actions.updateGreeting;
};

class HelloMessage extends React.Component<Props, any> {

  constructor(props) {
super(props);
this.state = {
  focus: false
};
  }
    render() {
        // ERROR: Type 'Readonly<{ children?: ReactNode; }> & Readonly<Props>' has no property 'updateGreting' and no string index signature.
        // const { greeting, repeat, updateGreting } = this.props;
        const { greeting, repeat, updateGreeting } = this.props;

        return (
            <div>
                <HelloMessageInput text={greeting} 
                onFocusSet={() => this.setState({
                  focus: false
                })}
                focus={this.state.focus} onChange={(text : string) => updateGreeting(text)}/>
                {/*<HelloMessageOutput greeting={greeting} repeat={repeat}/>*/}
                <HelloMessageOutput {...this.props}/>
                <HelloMessageButton onClicked={() => this.reset()} text="Clear"/>
            </div>);
    }
    reset() {
        const { resetGreeting } = this.props;
        this.setState({
          focus: true
        });
        resetGreeting();
    }
}

export default connect(
    (state: State) => ({greeting: state.greeting}),
    actions
)(HelloMessage);
