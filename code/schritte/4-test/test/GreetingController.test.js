import React from 'react';
import GreetingDetail from '../src/GreetingDetail';
import GreetingController from '../src/GreetingController';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';

// Mock the backend module avoid "real" server calls
jest.mock('../src/backend', () => ({
    loadFromServer: jest.fn((success, failure) => success([
        {id: 1, name: 'Klaus', greeting: 'Moin moin'},
        {id: 2, name: 'Susi', greeting: 'Hello!'}
    ]))
}));

test('it should render greetings received from backend', () => {
    // render the component we want to test
    const tree = renderer.create(
        <GreetingController/>
    ).toJSON();

    // make sure the json matches the last stored snapshot
    // (saved on the filesystem in __snapshots__)
    expect(tree).toMatchSnapshot();
});

test('it should open detail view on button click', () => {
    // mount the component into a real dom (implemented by JSDom)
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

