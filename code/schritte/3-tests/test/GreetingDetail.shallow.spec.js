import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import GreetingDetail from '../src/GreetingDetail';

const greeting = {
    name: 'Lemmy',
    greeting: 'Rock-n-Roll'
};

const noop = () => { }

// TOOD split into several test cases as in GreetingDetail.jsdom.spec.js
describe('GreetingDetail with SHALLOW RENDERING', () => {
    it('properly renders shallow', () => {
        
        let greetingAdded;
        function onAddHandler(newGreeting) {
            greetingAdded = newGreeting;
        }

        const renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <GreetingDetail greeting={greeting} onAdd={onAddHandler} />
        );
        const tree = renderer.getRenderOutput();
        expect(tree.type).toBe('div');
        expect(tree.props.children.length).toEqual(4); // 2xinput ~ 2xbutton
        
        const [ nameInput, greetingInput ] = tree.props.children;
        expect(nameInput.props.value).toEqual('Lemmy');
        
        nameInput.props.onChange({target: {value: 'Klaus-Dieter'}});
        greetingInput.props.onChange({target: {value: 'Good morning'}});
        
        const updatedTree = renderer.getRenderOutput();
        const [ updatedNameInput, updatedGreetingInput, , saveButton ] = updatedTree.props.children;
        
        expect(updatedNameInput.props.value).toEqual('Klaus-Dieter');
        expect(updatedGreetingInput.props.value).toEqual('Good morning');
        
        saveButton.props.onClick();
        expect(greetingAdded).toEqual({name: 'Klaus-Dieter', greeting: 'Good morning'});
    });

    // it('clear button clears both input fields', () => {
    //     const component = ReactTestUtils.renderIntoDocument(
    //         <GreetingDetail greeting={greeting} onAdd={noop}  />
    //     );

    //     const [nameInput, greetingInput] = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'input');
    //     const [clearButton, saveButton] = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
    //     ReactTestUtils.Simulate.click(clearButton);
    //     expect(nameInput.value).toEqual('');
    //     expect(clearButton.value).toEqual('');
    // });

    // it('onAdd callback is called with new greeting', () => {
    //     let greetingAdded;
    //     function onAddHandler(newGreeting) {
    //         greetingAdded = newGreeting;
    //     }
    //     const component = ReactTestUtils.renderIntoDocument(
    //         <GreetingDetail greeting={greeting} onAdd={onAddHandler}  />
    //     );

    //     const [nameInput, greetingInput] = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'input');
    //     nameInput.value = 'Klaus-Dieter';
    //     ReactTestUtils.Simulate.change(nameInput);

    //     greetingInput.value = 'Good morning';
    //     ReactTestUtils.Simulate.change(greetingInput);

    //     const [, saveButton] = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
    //     ReactTestUtils.Simulate.click(saveButton);

    //     expect(greetingAdded.name).toEqual('Klaus-Dieter');
    //     expect(greetingAdded.greeting).toEqual('Good morning');

    // });

    // // const buttons = ReactTestUtils.findAllInRenderedTree(component, candidate => candidate instanceof HTMLButtonElement && candidate.textContent === 'Clear');
    // // console.log('buttons', buttons);
});
