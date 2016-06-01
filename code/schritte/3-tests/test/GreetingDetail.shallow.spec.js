import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import GreetingDetail from '../src/GreetingDetail';

const noop = () => { }

const greeting = {
    name: 'Lemmy',
    greeting: 'Rock-n-Roll'
};

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

        const [nameInput, greetingInput] = tree.props.children;
        expect(nameInput.props.value).toEqual('Lemmy');

        nameInput.props.onChange({ target: { value: 'Klaus-Dieter' } });
        greetingInput.props.onChange({ target: { value: 'Good morning' } });

        const updatedTree = renderer.getRenderOutput();
        const [updatedNameInput, updatedGreetingInput, , saveButton] = updatedTree.props.children;

        expect(updatedNameInput.props.value).toEqual('Klaus-Dieter');
        expect(updatedGreetingInput.props.value).toEqual('Good morning');

        saveButton.props.onClick();
        expect(greetingAdded).toEqual({ name: 'Klaus-Dieter', greeting: 'Good morning' });
    });

    it('renders', () => {
        const renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <GreetingDetail greeting={greeting} />
        );
        const tree = renderer.getRenderOutput();
        expect(tree.type).toBe('div');
        expect(tree.props.children.length).toEqual(4); // 2xinput ~ 2xbutton
    });
});
