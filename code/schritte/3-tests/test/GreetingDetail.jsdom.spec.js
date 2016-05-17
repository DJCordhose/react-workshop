import expect from 'expect';
import jsdom from 'mocha-jsdom';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import GreetingDetail from '../src/GreetingDetail';

const greeting = {
    name: 'Lemmy',
    greeting: 'Rock-n-Roll'
};

const noop = () => { }

describe('GreetingDetail with JSDOM', () => {
    jsdom();
    it('properly renders into Document', () => {
        const component = ReactTestUtils.renderIntoDocument(
            <GreetingDetail greeting={greeting} onAdd={noop}  />
        );

        // in a 'real' test suite one would move this to a helper/util function
        const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'input');
        expect(inputs.length).toEqual(2); // name ~ greeting
        const [nameInput, greetingInput] = inputs;
        expect(nameInput.value).toEqual('Lemmy');
        expect(greetingInput.value).toEqual('Rock-n-Roll');

        const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).toEqual(2); // Clear ~ Save
        const [clearButton, saveButton] = buttons;
        expect(clearButton.textContent).toEqual('Clear'); // senseless
        expect(saveButton.textContent).toEqual('Save'); // senseless
    });

    it('clear button clears both input fields', () => {
        const component = ReactTestUtils.renderIntoDocument(
            <GreetingDetail greeting={greeting} onAdd={noop}  />
        );

        const [nameInput, greetingInput] = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'input');
        const [clearButton, saveButton] = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
        ReactTestUtils.Simulate.click(clearButton);
        expect(nameInput.value).toEqual('');
        expect(clearButton.value).toEqual('');
    });
    
    it('onAdd callback is called with new greeting', () => {
        let greetingAdded;
        function onAddHandler(newGreeting) {
            greetingAdded = newGreeting;
        }
        const component = ReactTestUtils.renderIntoDocument(
            <GreetingDetail greeting={greeting} onAdd={onAddHandler}  />
        );
        
        const [nameInput, greetingInput] = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'input');
        nameInput.value = 'Klaus-Dieter';
        ReactTestUtils.Simulate.change(nameInput);
        
        greetingInput.value = 'Good morning';
        ReactTestUtils.Simulate.change(greetingInput);
        
        const [, saveButton] = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
        ReactTestUtils.Simulate.click(saveButton);
        
        expect(greetingAdded.name).toEqual('Klaus-Dieter');
        expect(greetingAdded.greeting).toEqual('Good morning');

    });

    // const buttons = ReactTestUtils.findAllInRenderedTree(component, candidate => candidate instanceof HTMLButtonElement && candidate.textContent === 'Clear');
    // console.log('buttons', buttons);
});
