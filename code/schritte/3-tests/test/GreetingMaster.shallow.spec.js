import expect from 'expect';
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

describe('GreetingMaster with SHALLOW RENDERING', () => {
    it('properly renders', () => {
        const renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <GreetingMaster greetings={sampleGreetings} />
        );
        const tree = renderer.getRenderOutput();
        expect(tree.type).toBe('div');
        expect(tree.props.children.length).toEqual(2); // table ~ button

        const table = tree.props.children[0];
        expect(table.type).toBe('table');

        const tbody = table.props.children[1];
        expect(tbody.type).toBe('tbody');

        const rows = tbody.props.children;
        expect(rows).toEqual([
            <tr key='1'><td>Olli</td><td>Huhu</td></tr>,
            <tr key='2'><td>Oma</td><td>Hallo</td></tr>
        ]);
    });

    it('adds event handler for add button', () => {
        let onAddCallbackInvoked = false;
        function onAddCallback() { onAddCallbackInvoked = true; }
        const renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <GreetingMaster greetings={sampleGreetings} onAdd={onAddCallback} />
        );
        const tree = renderer.getRenderOutput();
        const button = tree.props.children[1];
        expect(button.props.onClick).toEqual(onAddCallback);
        button.props.onClick();
        expect(onAddCallbackInvoked).toEqual(true);
    });
});
