import React from 'react';
import GreetingDetail from '../src/GreetingDetail';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

const exactlyOne = component => {
    expect(component).toHaveLength(1);
    return component;
};

const setup = () => {
    const onAddMock =  jest.fn();

    const component = shallow(<GreetingDetail onAdd={onAddMock} />);

    const nameInput = exactlyOne(component.find('input[name="name"]'));
    const greetingInput = exactlyOne(component.find('input[name="greeting"]'));
    const addButton = exactlyOne(component.find('button[children="Save"]'));
    const clearButton = exactlyOne(component.find('button[children="Clear"]'));

    return {
        onAddMock,
        component,
        elements: {
            nameInput, greetingInput, addButton, clearButton
        }
    }
};

const aGreeting = {
    name: 'Susi',
    greeting: 'Moin'
};

test('it should render fine', () => {
    const onAddMock = jest.fn();
    // render the component we want to test
    const tree = renderer.create(
        <GreetingDetail onAdd={onAddMock}/>
    ).toJSON();

    // make sure the json matches the last stored snapshot
    // (saved on the filesystem in __snapshots__)
    expect(tree).toMatchSnapshot();
});

test('onAdd should be called with values from form', () => {
    const { onAddMock, elements } = setup();

    elements.nameInput.simulate('change', { target: { value: aGreeting.name } });
    // checking the state here might be too much in real live,
    // here just to demonstrate the Enzyme API

    elements.greetingInput.simulate('change', { target: { value: aGreeting.greeting } });

    elements.addButton.simulate('click');
    expect(onAddMock.mock.calls).toHaveLength(1);
    expect(onAddMock.mock.calls[0][0]).toEqual(aGreeting);
});

test('clear should clear the form', () => {
    const { component, elements } = setup();

    // enter
    elements.nameInput.simulate('change', { target: { value: aGreeting.name } });
    elements.greetingInput.simulate('change', { target: { value: aGreeting.greeting } });

    // just to make sure, state has a value before resetting
    expect(component.state('name')).toEqual(aGreeting.name);
    expect(component.state('greeting')).toEqual(aGreeting.greeting);

    // press clear button
    elements.clearButton.simulate('click');

    // make sure state has been reset correctly
    expect(component.state('name')).toEqual('');
    expect(component.state('greeting')).toEqual('');
});
