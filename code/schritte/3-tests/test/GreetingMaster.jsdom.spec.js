import expect from 'expect';
import jsdom from 'mocha-jsdom';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import GreetingMaster from '../src/GreetingMaster';

const sampleGreetings = [
    {
        id: 1,
        name: 'Olli',
        greeting: 'Huhu'
    },
    {
        id: 2,
        name: 'Oma',
        greeting: 'Hallo'
    }
];

// function components are not really supported by ReactTestUtils
// so we need to create a stateful wrapper class around
class Wrapper extends React.Component {
    render() {
        return this.props.children;
    }
}

describe('GreetingMaster with JSDOM', () => {
    jsdom();
    it('properly renders into Document', () => {

        const component = ReactTestUtils.renderIntoDocument(
            <Wrapper><GreetingMaster greetings={sampleGreetings} /></Wrapper>
        );

        const columns = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'td');
        expect(columns.length).toEqual(4);

        expect(columns.map(col => col.textContent)).toEqual(['Olli', 'Huhu', 'Oma', 'Hallo']);
    });
});
