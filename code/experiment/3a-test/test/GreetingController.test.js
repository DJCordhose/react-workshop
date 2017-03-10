import React from 'react';
import GreetingMaster from '../src/GreetingMaster';
import GreetingDetail from '../src/GreetingDetail';
import GreetingController from '../src/GreetingController';
import backend from '../src/backend';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';

jest.mock('../src/backend', () => ({
    loadFromServer: jest.fn((success, failure) => success([
        {id: 1, name: 'Klaus', greeting: 'Moin moin'},
        {id: 2, name: 'Susi', greeting: 'Hello!'}
    ]))
}));

test('it should render greetings received from backend', () => {
    const tree = renderer.create(
        <GreetingController/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

test('it should open detail view on button click', () => {
    const component = mount(<GreetingController  />);

    // on initial render the list with greetings (GreetingMaster)
    // is visible but no GreetingDetail
    expect(component.find(GreetingDetail)).toHaveLength(0);

    // find the "add" Button...
    const addButton = component.find('button');

    // click on the button
    addButton.simulate('click');

    // now the GreetingDetail should be visible
    expect(component.find(GreetingDetail)).toHaveLength(1);
});

